

import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import RoutesComponent from './services/Routes';
import refreshApi from "./services/refreshApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/App.css"

function App() {
    return (

            <AuthProvider
                authName={"_auth"} authType={"cookie"}
                refresh={refreshApi}
            >
                <RoutesComponent/>
            </AuthProvider>

    );
}

export default App;
