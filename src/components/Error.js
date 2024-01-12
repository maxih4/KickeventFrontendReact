import React from 'react';
import {Alert} from "antd";

function Error({search}) {
    return (
        <div className="container mb-8">
            <Alert message={<div className="text-text text-xl">Keine Events gefunden für "{search}"</div>} type="error" showIcon></Alert>
        </div>
    );
}

export default Error;