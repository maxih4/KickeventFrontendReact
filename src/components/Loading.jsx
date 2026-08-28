import React from 'react';
import {Spin} from "antd";

function Loading() {
    return (
        <div className="loading-state" aria-busy="true" aria-live="polite">
            <Spin size="large"/>
        </div>
    );
}

export default Loading;
