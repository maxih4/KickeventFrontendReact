import React, {memo} from 'react';
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import {Button} from "antd";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const containerStyle = {
    width: '100%',
    height: '176px',
};
const url = "https://www.google.com/maps/dir/?api=1&destination=";

function MapLocation(props) {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
        language: "de"
    });
    const center = {
        lat: props.latitude,
        lng: props.longitude
    };

    if (!isLoaded || center.lat == null || center.lat === 0 || center.lng === 0 || center.lng == null) {
        return null;
    }

    return (
        <div className="map-location">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
                <MarkerF position={center}/>
            </GoogleMap>
            <div className="map-route-button">
                <Button
                    icon={<LocationOnOutlinedIcon/>}
                    onClick={() => window.open(url + center.lat + " " + center.lng, '_blank')}
                >
                    Route berechnen
                </Button>
            </div>
        </div>
    );
}

export default memo(MapLocation);
