import React from 'react';
import {Spin} from "antd";

function Loading() {
    return (
        <div className="flex min-h-[84px] items-center justify-center text-primary-500" aria-busy="true" aria-live="polite">
            <Spin size="large"/>
        </div>
    );
}

export default Loading;
