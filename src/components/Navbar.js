import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../img/logo.png"
import {useIsAuthenticated, useSignOut} from "react-auth-kit";


function Navbar(props) {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand navbar-light bg-white">
            <div className="container">


                    <Link to={"/"} className="navbar-brand " style={{
                        fontFamily: 'Sometype Mono',
                        fontSize: "30px",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    }}><span className="d-none d-md-inline-block">KickEvent</span>
                        <img src={logo} height="40px" alt="Kickevent Logo" className="">
                        </img>
                    </Link>



                    {!isAuthenticated() &&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button onClick={() => navigate("/login")} className="rounded-pill"
                                        style={{
                                            borderColor: "#77BB41",
                                            borderStyle: "solid",
                                            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.35)"
                                        }}>
                                    <span className="ms-md-2 me-md-2" style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: "Outfit",
                                        fontSize: "20px",
                                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}>Login</span>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{
                                    backgroundColor: "#77BB41",
                                    borderColor: "#77BB41",
                                    borderStyle: "solid",
                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.35)"
                                }} onClick={() => navigate("/register")}>
                                    <span
                                        className="ms-md-2 me-md-2" style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: "Outfit",
                                        fontSize: "20px",
                                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}>Registrieren</span>
                                </button>
                            </li>
                        </ul>
                    }

                    {isAuthenticated() &&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button onClick={() => navigate("/user")} className="rounded-pill"
                                        style={{
                                            borderColor: "#77BB41",
                                            borderStyle: "solid",
                                            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.35)"
                                        }}>
                                    <span className="ms-md-2 me-md-2" style={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontFamily: "Outfit",
                                        fontSize: "20px",
                                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}><i className="bi bi-person-circle me-1"></i>UserPanel</span>
                                </button>
                            </li>
                            <li className="nav-item px-2">
                                <button className="rounded-pill " style={{
                                    backgroundColor: "#77BB41",
                                    borderColor: "#77BB41",
                                    borderStyle: "solid",
                                    fontFamily: "Outfit",
                                    fontSize: "20px",
                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.35)"
                                }} onClick={() => signOut()}>
                                    <span className="ms-md-2 me-md-2"
                                          style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><i className="bi bi-box-arrow-right me-1"></i>Logout</span>
                                </button>
                            </li>
                        </ul>
                    }


                </div>



        </nav>
    )
        ;
}

export default Navbar;