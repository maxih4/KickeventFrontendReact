import React from 'react';
import {Alert} from "antd";

function Error(props) {
    return (
        <div className="container mb-8">
            <Alert message={<div className="text-text text-xl">Keine Events gefunden</div>} type="error" showIcon></Alert>
        </div>
    );
}

export default Error;