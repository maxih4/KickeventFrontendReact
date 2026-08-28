import React from 'react';
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import RoutesComponent from './services/Routes';
import refreshApi from "./services/refreshApi";
import "./css/App.scss"
import {ConfigProvider, theme} from "antd";

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
    refresh: refreshApi
});

function App() {
    const {darkAlgorithm} = theme;
    return (
        <ConfigProvider theme={{
            algorithm: darkAlgorithm,
            hashed: false,
            token: {
                colorBgBase: '#112f04',
                colorBgContainer: '#235f07',
                colorBgElevated: '#235f07',
                colorBorder: '#338d0c',
                colorText: '#effde7',
                colorTextSecondary: '#bff7a1',
            },
            components: {
                Card: {
                    actionsBg: '#112f04',
                    headerBg: '#235f07',
                },
            },
        }}>
            <AuthProvider store={store}>
                <RoutesComponent/>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;
