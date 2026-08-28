import React from 'react';
import {Alert} from "antd";

function Error({search}) {
    return (
        <div className="my-4">
            <Alert title={`Keine Events gefunden${search === "" ? "" : ` für \"${search}\"`}`} type="error" showIcon/>
        </div>
    );
}

export default Error;
