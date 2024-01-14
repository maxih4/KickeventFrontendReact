import React from 'react';
import {Spin} from "antd";

function Loading(props) {
    return (
        <div className="container pb-4 mt-5 rounded-4 flex flex-row justify-center">
            <Spin size="large" className="mt-4">

            </Spin>

        </div>
    );
}

export default Loading;