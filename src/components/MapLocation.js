import React, {memo, useCallback} from 'react'
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";


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
            <div className="flex flex-row justify-center pt-4">
                <button className="bg-none bg-inherit border-none p-0 outline-inherit"
                        onClick={() => window.open(url + center.lat + " " + center.lng, '_blank')}>
                    <div
                        className="inline-flex items-center justify-center h-10 px-8 py-0 text-xl font-semibold text-center text-text no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-white-500 border-solid rounded-full cursor-pointer select-none hover:text-primary-400 hover:border-primary-400 focus:shadow-xs focus:no-underline">
                        <LocationOnOutlinedIcon/> Route berechnen
                    </div>
                </button>
            </div>


        </>
    ) : <></>
}

export default memo(MyComponent)