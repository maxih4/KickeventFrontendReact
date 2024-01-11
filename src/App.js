import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import RoutesComponent from './services/Routes';
import refreshApi from "./services/refreshApi";
import "./css/App.scss"
import Footer from "./components/Footer";
import {ConfigProvider, theme} from "antd";

function App() {
    const { darkAlgorithm } = theme;
    return (
            <div className="app bg-background">
                <ConfigProvider theme={{algorithm:darkAlgorithm,hashed:false}}>
            <AuthProvider
                authName={"_auth"} authType={"cookie"}
                refresh={refreshApi}
            >
                <RoutesComponent/>

                <Footer/>

            </AuthProvider>
                </ConfigProvider>
            </div>
    );
}

export default App;
