import React from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserPanel from '../pages/UserPanel'
import SingleEvent from "../pages/SingleEvent";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import EventEditor from "../pages/EventEditor";
import Impressum from "../pages/Impressum";
import Footer from "../components/Footer";

const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated;
    return auth ? <Component /> : <Navigate to="/login" />;
};

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Navbar/>
                <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
                <main className="app-main" id="main-content">
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/user'} element={<PrivateRoute Component={UserPanel}/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/event/:id'} element={<SingleEvent/>}/>
                        <Route path={'/createEvent'} element={<PrivateRoute Component={EventEditor}/>}/>
                        <Route path={'/impressum'} element={<Impressum/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default RoutesComponent
