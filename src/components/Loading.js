import React from 'react';
import {Spin} from "antd";

function Loading(props) {
    return (
        <div className="container bg-light pb-4 mt-5 main rounded-4 d-flex flex-row justify-content-center">
            <Spin size="large" className="mt-4">

            </Spin>

        </div>
    );
}

export default Loading;