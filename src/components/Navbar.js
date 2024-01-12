import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import {useIsAuthenticated, useSignOut} from "react-auth-kit";
import { Divider} from "antd";
import {LogoutOutlined, PlusCircleOutlined, UserOutlined} from "@ant-design/icons";


function Navbar(props) {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()
    const navigate = useNavigate()
    return (<>
            {/*} <nav className="navbar navbar-expand navbar-light">
            <div className="container">


                    <Link to={"/"} className="navbar-brand"><span className="d-none d-md-inline-block">KickEvent</span>
                        <img color="#a1f47d" src={logo} height="40px" alt="Kickevent Logo" className="">
                        </img>
                    </Link>



                    {!isAuthenticated() &&
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <button onClick={() => navigate("/login")} className="rounded-pill"
                                        style={{
                                            borderColor: "$primary",
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
                                    backgroundColor: "$primary",
                                    borderColor: "$primary",
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
                                            borderColor: "$primary",
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
                                    backgroundColor: "$primary",
                                    borderColor: "$primary",
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



        </nav>*/}
            <nav className="flex flex-wrap flex-row items-center justify-between container ">
                <Link to={"/"} className=" no-underline">
                    <span className="logo text-text no-underline align-middle hidden md:inline-block">KickEvent</span>

                    <svg className="fill-text align-middle " version="1.0" xmlns="http://www.w3.org/2000/svg"
                         width="40.000000pt" height="40.000000pt" viewBox="0 0 60.000000 60.000000"
                         preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,60.000000) scale(0.100000,-0.100000)"
                           stroke="none">
                            <path d="M215 556 c-17 -26 -8 -69 18 -79 24 -9 57 21 57 52 0 52 -47 69 -75
27z m53 -19 c5 -27 -17 -50 -34 -36 -15 12 -19 41 -7 53 12 12 38 1 41 -17z"/>
                            <path d="M140 498 c-14 -5 -45 -11 -70 -11 -38 -2 -45 -5 -45 -22 0 -23 52
-38 103 -29 l33 5 -1 -73 c-1 -40 3 -95 9 -123 l11 -50 -51 -48 c-54 -50 -58
-68 -26 -111 19 -26 49 -15 42 16 -4 18 2 28 28 46 53 35 74 64 81 109 l6 42
-35 -6 c-28 -4 -35 -2 -35 11 0 22 84 11 130 -19 105 -66 102 -66 135 -27 39
44 26 77 -20 52 -21 -11 -28 -9 -67 23 -24 20 -56 40 -71 46 -17 7 -27 18 -27
31 0 11 -4 20 -10 20 -5 0 -10 -4 -10 -10 0 -5 -13 -7 -30 -3 -19 3 -30 1 -30
-6 0 -6 9 -11 20 -11 12 0 30 -8 41 -18 19 -18 19 -19 1 -35 -15 -14 -24 -15
-50 -6 -32 11 -32 11 -26 64 8 64 -1 105 -21 105 -28 0 -15 20 16 27 22 4 27
8 17 14 -16 10 -17 10 -48 -3z m-20 -38 c0 -12 -24 -12 -60 0 -21 7 -19 8 18
9 23 1 42 -3 42 -9z m184 -156 c26 -10 20 -37 -6 -28 -29 8 -31 10 -23 23 7
13 8 13 29 5z m96 -76 c0 -11 -15 -10 -45 4 -24 11 -32 28 -19 41 7 7 64 -33
64 -45z m50 3 c-14 -27 -30 -36 -30 -17 0 8 8 20 18 25 23 14 24 14 12 -8z
m-220 -41 c0 -20 -5 -30 -15 -30 -10 0 -15 10 -15 30 0 20 5 30 15 30 10 0 15
-10 15 -30z m-36 -39 c7 -10 -59 -63 -67 -54 -4 3 3 19 14 34 20 29 43 37 53
20z m-75 -83 c10 -30 9 -31 -4 -14 -8 11 -15 26 -15 33 0 22 8 14 19 -19z"/>
                            <path d="M286 481 c-4 -5 0 -12 6 -14 23 -9 -13 -26 -43 -20 -29 5 -47 -18
-26 -35 47 -35 119 -40 125 -8 7 36 -47 102 -62 77z m43 -55 c8 -10 8 -16 -2
-24 -9 -8 -23 -6 -52 8 -39 18 -39 19 -7 13 20 -3 32 -1 32 6 0 15 15 14 29
-3z"/>
                            <path d="M486 414 c-21 -21 -20 -57 2 -77 24 -22 55 -21 75 1 34 37 11 92 -38
92 -13 0 -31 -7 -39 -16z m72 -36 c2 -19 -2 -28 -18 -33 -24 -8 -50 10 -50 35
0 24 10 31 40 28 19 -2 26 -10 28 -30z"/>
                        </g>
                    </svg>


                </Link>
                <div className="flex flex-row justify-end">
                    {isAuthenticated() ? <>
                            <div onClick={() => navigate("/user")}
                                 className="select-none cursor-pointer relative rounded px-2.5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-2">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative font-body"><UserOutlined className="md:text-xl"/></span>
                            </div>

                            <div onClick={() => navigate("/createEvent")}
                                 className="select-none cursor-pointer relative rounded px-2.5 py-2.5 overflow-hidden group bg-secondary-500 hover:bg-gradient-to-r hover:from-secondary-500 hover:to-secondary-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-secondary-500 transition-all ease-out duration-300 mr-2">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative font-body"><PlusCircleOutlined className="md:text-xl"/></span>
                            </div>

                            <div onClick={() => signOut()}
                                 className="select-none cursor-pointer relative rounded px-2.5 py-2.5 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-white-500 hover:to-white-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-white-400 transition-all ease-out duration-300">
                                <div
                                    className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                                <div className="relative font-body"><LogoutOutlined className="md:text-xl"/></div>
                            </div>
                        </> :

                        <>
                            <div onClick={() => navigate("/login")}
                                 className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative font-body">Login</span>
                            </div>

                            <div onClick={() => navigate("/register")}
                    className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-secondary-500 hover:bg-gradient-to-r hover:from-secondary-500 hover:to-secondary-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-secondary-400 transition-all ease-out duration-300 ml-1">
                    <div
                        className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                    <div className="relative font-body">Registrieren</div>
                </div></>
                }


            </div>
    </nav>
    <Divider className="bg-primary-100 w-full mt-1 opacity-50" orientationMargin=""/>
</>
)
    ;
}

export default Navbar;