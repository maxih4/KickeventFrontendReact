import React from 'react';
import {Link} from "react-router-dom";
import logo from "../img/logo.png"


function Navbar(props) {
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
                        <ul className="navbar-nav">

                            <li className="nav-item px-2">
                                <button className="rounded-pill" style={{borderColor: "#77BB41", borderStyle:"solid"}}>
                                    <Link to="/login" style={{textDecoration:"none", color:"black"}}>Login</Link>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{backgroundColor:"#77BB41" , borderColor: "#77BB41", borderStyle:"solid"}}>
                                    Registrieren
                                </button>
                            </li>
                        </ul>
                    </div>

            </div>

        </nav>
    );
}

export default Navbar;