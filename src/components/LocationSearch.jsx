import React, {useEffect, useId, useRef, useState} from 'react';
import {useJsApiLoader} from '@react-google-maps/api';

const GOOGLE_MAPS_LIBRARIES = ['places'];
const PLACE_FIELDS = ['addressComponents', 'formattedAddress', 'location'];

function getComponentValue(addressComponents, type) {
    const component = addressComponents?.find((item) => item.types?.includes(type));
    return component?.longText || component?.shortText || '';
}

function getPredictionText(placePrediction) {
    return placePrediction?.text?.text || placePrediction?.mainText?.text || '';
}

function getCoordinate(value) {
    return typeof value === 'function' ? value() : value;
}

function LocationSearch({setLong, setLang, setHouseNumber, setPostalCode, setCity, setStreet, addressLabel}) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    const initialAddress = addressLabel && !addressLabel.toString().includes('undefined') ? addressLabel : '';
    const suggestionsId = `location-suggestions-${useId().replace(/:/g, '')}`;
    const [inputValue, setInputValue] = useState(initialAddress);
    const [suggestions, setSuggestions] = useState([]);
    const [placesLibrary, setPlacesLibrary] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const requestId = useRef(0);
    const sessionToken = useRef(null);
    const hasInteracted = useRef(false);
    const suppressNextSearch = useRef(false);

    const {isLoaded, loadError} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: GOOGLE_MAPS_LIBRARIES,
        language: 'de'
    });

    useEffect(() => {
        let cancelled = false;

        if (!isLoaded || loadError || !window.google?.maps?.importLibrary) {
            return undefined;
        }

        window.google.maps.importLibrary('places')
            .then((library) => {
                if (!cancelled) {
                    setPlacesLibrary(library);
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    console.error('Google Places API could not be loaded.', error);
                    setPlacesLibrary(null);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [isLoaded, loadError]);

    useEffect(() => {
        if (suppressNextSearch.current) {
            suppressNextSearch.current = false;
            return undefined;
        }

        const query = inputValue.trim();
        if (!hasInteracted.current || query.length < 2 || !placesLibrary?.AutocompleteSuggestion) {
            setSuggestions([]);
            setHighlightedIndex(-1);
            return undefined;
        }

        const currentRequestId = ++requestId.current;
        let cancelled = false;
        const timeoutId = window.setTimeout(async () => {
            try {
                if (!sessionToken.current && placesLibrary.AutocompleteSessionToken) {
                    sessionToken.current = new placesLibrary.AutocompleteSessionToken();
                }

                const request = {
                    input: query,
                    includedRegionCodes: ['de'],
                    language: 'de',
                    sessionToken: sessionToken.current
                };
                const {suggestions: nextSuggestions = []} =
                    await placesLibrary.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

                if (!cancelled && currentRequestId === requestId.current) {
                    setSuggestions(nextSuggestions.filter((suggestion) => suggestion?.placePrediction));
                    setHighlightedIndex(-1);
                }
            } catch (error) {
                if (!cancelled && currentRequestId === requestId.current) {
                    console.error('Google Places suggestions could not be loaded.', error);
                    setSuggestions([]);
                }
            }
        }, 250);

        return () => {
            cancelled = true;
            window.clearTimeout(timeoutId);
        };
    }, [inputValue, placesLibrary]);

    async function selectPrediction(placePrediction) {
        if (!placePrediction?.toPlace) {
            return;
        }

        requestId.current += 1;
        setSuggestions([]);
        setHighlightedIndex(-1);

        try {
            const place = placePrediction.toPlace();
            await place.fetchFields({fields: PLACE_FIELDS});
            const addressComponents = place.addressComponents || [];
            const location = place.location;
            const latitude = getCoordinate(location?.lat);
            const longitude = getCoordinate(location?.lng);

            setHouseNumber(getComponentValue(addressComponents, 'street_number'));
            setStreet(getComponentValue(addressComponents, 'route'));
            setPostalCode(getComponentValue(addressComponents, 'postal_code'));
            setCity(
                getComponentValue(addressComponents, 'locality') ||
                getComponentValue(addressComponents, 'postal_town') ||
                getComponentValue(addressComponents, 'administrative_area_level_2')
            );

            if (typeof latitude === 'number' && typeof longitude === 'number') {
                setLang(latitude);
                setLong(longitude);
            }

            suppressNextSearch.current = true;
            hasInteracted.current = false;
            setInputValue(place.formattedAddress || getPredictionText(placePrediction));
            sessionToken.current = null;
        } catch (error) {
            console.error('Google Place details could not be loaded.', error);
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowDown' && suggestions.length > 0) {
            event.preventDefault();
            setHighlightedIndex((index) => (index + 1) % suggestions.length);
        } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
            event.preventDefault();
            setHighlightedIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
        } else if (event.key === 'Enter' && highlightedIndex >= 0) {
            event.preventDefault();
            selectPrediction(suggestions[highlightedIndex]?.placePrediction);
        } else if (event.key === 'Escape') {
            setSuggestions([]);
            setHighlightedIndex(-1);
        }
    }

    return (
        <div className="relative mx-auto w-5/6">
            <input
                aria-autocomplete="list"
                aria-controls={suggestionsId}
                aria-expanded={suggestions.length > 0}
                className="ant-input w-full search-location"
                disabled={!apiKey}
                onBlur={() => window.setTimeout(() => setSuggestions([]), 150)}
                onChange={(event) => {
                    hasInteracted.current = true;
                    setInputValue(event.target.value);
                    setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Bitte Standort eingeben"
                role="combobox"
                type="text"
                value={inputValue}
            />
            {suggestions.length > 0 && (
                <ul
                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-background-900 p-1 shadow-lg"
                    id={suggestionsId}
                    role="listbox"
                >
                    {suggestions.map(({placePrediction}, index) => (
                        <li
                            aria-selected={index === highlightedIndex}
                            className={`cursor-pointer rounded px-3 py-2 text-left text-white ${index === highlightedIndex ? 'bg-background-800' : 'hover:bg-background-800'}`}
                            key={`${placePrediction.placeId || getPredictionText(placePrediction)}-${index}`}
                            onMouseDown={(event) => {
                                event.preventDefault();
                                selectPrediction(placePrediction);
                            }}
                            role="option"
                        >
                            {getPredictionText(placePrediction)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LocationSearch;
