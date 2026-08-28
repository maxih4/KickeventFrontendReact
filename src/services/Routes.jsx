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
            <div className="flex min-h-dvh flex-col bg-slate-50 font-body text-text-900 dark:bg-background-950 dark:text-text">
                <Navbar/>
                <a
                    className="absolute start-2 top-2 z-[1000] -translate-y-[150%] rounded-lg bg-white px-3 py-2 text-text-900 shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 dark:bg-background-800 dark:text-text"
                    href="#main-content"
                >
                    Zum Inhalt springen
                </a>
                <main className="block flex-1" id="main-content">
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
