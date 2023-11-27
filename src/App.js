

import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import RoutesComponent from './Routes';
import refreshApi from "./refreshApi";

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
