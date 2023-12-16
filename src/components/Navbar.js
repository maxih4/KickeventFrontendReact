import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../img/logo.png"
import {useIsAuthenticated, useSignOut} from "react-auth-kit";


function Navbar(props) {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand navbar-light bg-white py-3">
            <div className="container">

                <div className="">
                    <Link to={"/"} className="navbar-brand" style={{
                        fontFamily: 'Sometype Mono',
                        fontSize: "39px",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    }}>KickEvent
                        <img src={logo} height="60px" alt="Kickevent Logo">
                        </img>
                    </Link>
                </div>
                <div className="">

                    {!isAuthenticated() &&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button onClick={() => navigate("/login")} className="rounded-pill"
                                        style={{borderColor: "#77BB41", borderStyle: "solid",boxShadow:"0px 8px 15px rgba(0, 0, 0, 0.35)"}}>
                                    <span className="ms-5 me-5" style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: "Outfit",
                                        fontSize: "25px",
                                        textShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}>Login</span>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{
                                    backgroundColor: "#77BB41",
                                    borderColor: "#77BB41",
                                    borderStyle: "solid",
                                    boxShadow:"0px 8px 15px rgba(0, 0, 0, 0.35)"
                                }} onClick={() => navigate("/register")}>
                                    <span
                                        className="ms-5 me-5" style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: "Outfit",
                                        fontSize: "25px",
                                        textShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}>Registrieren</span>
                                </button>
                            </li>
                        </ul>
                    }

                    {isAuthenticated() &&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button onClick={()=>navigate("/user")} className="rounded-pill"
                                        style={{borderColor: "#77BB41", borderStyle: "solid",boxShadow:"0px 8px 15px rgba(0, 0, 0, 0.35)"}}>
                                    <span className="ms-5 me-5" style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: "Outfit",
                                        fontSize: "25px",
                                        textShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}>UserPanel</span>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{
                                    backgroundColor: "#77BB41",
                                    borderColor: "#77BB41",
                                    borderStyle: "solid", fontFamily: "Outfit", fontSize: "25px",boxShadow:"0px 8px 15px rgba(0, 0, 0, 0.35)"
                                }} onClick={() => signOut()}>
                                    <span className="ms-5 me-5" style={{textShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"}}>Logout</span>
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