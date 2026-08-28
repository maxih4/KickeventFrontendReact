import React from 'react';
import {Alert} from "antd";

function Error({search}) {
    return (
        <div className="container mb-8">
            <Alert title={<div className="text-text text-xl">Keine Events gefunden {search=== "" ? "":"für \"" +search +"\""} </div>} type="error" showIcon></Alert>
        </div>
    );
}

export default Error;
