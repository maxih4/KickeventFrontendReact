import React from 'react';
import {Link} from "react-router-dom";
import logo from "../img/logo.png"
import {useIsAuthenticated, useSignOut} from "react-auth-kit";


function Navbar(props) {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
    return (
        <nav className="navbar navbar-expand navbar-light bg-white">
            <div className="container">

                <div className="">
                    <Link to={"/"} className="navbar-brand" style={{fontFamily: 'Sometype Mono'}}>KickEvent
                        <img src={logo} height="30px" alt="Kickevent Logo">
                        </img>
                    </Link>
                </div>
                <div className="">

                    {!isAuthenticated() &&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button className="rounded-pill" style={{borderColor: "#77BB41", borderStyle: "solid"}}>
                                    <Link to="/login" style={{textDecoration: "none", color: "black"}}>Login</Link>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{
                                    backgroundColor: "#77BB41",
                                    borderColor: "#77BB41",
                                    borderStyle: "solid"
                                }}>
                                    <Link to="/register"
                                          style={{textDecoration: "none", color: "black"}}>Registrieren</Link>
                                </button>
                            </li>
                        </ul>
                    }

                    {isAuthenticated()&&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button className="rounded-pill" style={{borderColor: "#77BB41", borderStyle: "solid"}}>
                                    <Link to="/user" style={{textDecoration: "none", color: "black"}}>UserPanel</Link>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{
                                    backgroundColor: "#77BB41",
                                    borderColor: "#77BB41",
                                    borderStyle: "solid"
                                }} onClick={()=>signOut()}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    }



                </div>

            </div>

        </nav>
    )
        ;
}

export default Navbar;