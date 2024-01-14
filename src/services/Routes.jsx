import React from 'react'
import {useIsAuthenticated} from 'react-auth-kit'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import UserPanel from '../components/UserPanel'
import SingleEvent from "../components/SingleEvent";
import Navbar from "../components/Navbar";
import Register from "../components/Register";
import EventEditor from "../components/EventEditor";


const RoutesComponent = () => {
    const PrivateRoute = ({ Component }) => {
        const isAuthenticated = useIsAuthenticated();
        const auth = isAuthenticated();
        return auth ? <Component /> : <Navigate to="/login" />;
    };


    return (

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/user'} element={<PrivateRoute Component={UserPanel}/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/event/:id'} element={<SingleEvent/>}/>
                <Route path={'/createEvent'} element={<PrivateRoute Component={EventEditor}/>}/>

            </Routes>


        </BrowserRouter>

    )
}

export default RoutesComponent
