import React, {useEffect, useState} from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId} from 'react-google-places-autocomplete';
import {getLatLng} from "use-places-autocomplete";

function LocationSearch({setLong, setLang, setHouseNumber, setPostalCode, setCity, setStreet, addressLabel}) {

    const [value, setValue] = useState(null);


    useEffect(() => {
        if (value !== null) {
            getCoords()
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function getCoords() {
        geocodeByPlaceId(value.value.place_id)
            .then(results => {
                console.log(results)
                console.log(value)
                results[0].address_components.forEach((components) => {
                    switch (components.types[0]) {
                        case "street_number": {
                            setHouseNumber(components.long_name)
                            break;
                        }
                        case "route": {
                            setStreet(components.short_name)
                            break;
                        }
                        case "postal_code": {
                            setPostalCode(components.long_name)
                            break;
                        }
                        case "locality": {
                            setCity(components.long_name)
                            break;
                        }
                        default: {
                            return;
                        }

                    }
                })
                const {lat, lng} = getLatLng(results[0])
                setLong(lng)
                setLang(lat)
            })
            .catch(error => console.error(error));
    }


    return (

        <>
            <GooglePlacesAutocomplete
                autocompletionRequest={{componentRestrictions: {country: ["de"]}}}
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                selectProps={{
                    defaultInputValue: addressLabel.toString().includes("undefined") ? null:addressLabel,
                    value: value,
                    onChange: (e) => {
                        let placeId = ""
                        if (e) {
                            // eslint-disable-next-line
                            placeId = e["value"]["place_id"]
                        }
                        setValue(e)

                    },
                    placeholder: "Bitte Standort eingeben",
                    unstyled: true,
                    styles: {
                        input: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        control:(provided)=>({
                            ...provided,
                            minHeight:0,
                        }),
                        placeholder:(provided)=>({
                            ...provided,
                            color:"darkgrey",
                            opacity:0.4
                        }),
                        menuList:(provided)=>({
                            ...provided,
                            backgroundColor:"#141414"
                        })

                    },
                    className:"ant-input mx-auto w-5/6",
                    classNames:{
                        control:()=>"min-h-0",
                        menuList:()=>"mx-auto"
                    },
                    noOptionsMessage: () => "",
                }}

            />
        </>

    );
}

export default LocationSearch;