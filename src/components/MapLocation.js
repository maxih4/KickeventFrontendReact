import React, {memo, useCallback} from 'react'
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';


const containerStyle = {

    height: '400px'
};



const url="https://www.google.com/maps/dir/?api=1&destination="

function MyComponent(props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries:["places"]
    })

    const center={
        lat: props.latitude,lng:props.longitude
    }



    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!

    }, [])

    const onUnmount = useCallback(function callback(map) {

    }, [])

    return isLoaded&&center.lat !=null && center.lat!== 0&& center.lng!== 0 &&center.lng!=null ? (
        <><GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={9}
            onLoad={onLoad}
            onUnmount={onUnmount}

        >
            { /* Child components, such as markers, info windows, etc. */}

            <MarkerF position={center}></MarkerF>


        </GoogleMap>
            <div className="d-flex flex-row justify-content-center pt-4">
                <button className="buttonSearch rounded-pill" onClick={() => window.open(url + center.lat + " " + center.lng, '_blank')}><i className="bi bi-geo-alt-fill me-1"></i>Route
                    berechnen
                </button>
            </div>
            <hr className="my-4"/>
        </>
    ) : <></>
}

export default memo(MyComponent)