import React from 'react';
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import RoutesComponent from './services/Routes';
import refreshApi from "./services/refreshApi";
import "./css/App.scss"
import Footer from "./components/Footer";
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
        <ConfigProvider theme={{algorithm: darkAlgorithm, hashed: false}}>
            <AuthProvider store={store}>
                <RoutesComponent/>
                <Footer/>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;
