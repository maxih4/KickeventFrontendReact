import React from 'react';
import {Link} from "react-router-dom";
import SubmitButton from "./SubmitButton";

const HomeHeader = () => {



    return (
        <>
            <div className="row pb-5 pt-5">

            </div>
            <div className="row pt-5">
                <div className="col-lg-5 col-md-12 text-white" style={{fontFamily: "Outfit", fontSize: "80px", fontWeight: "bold"}}>
                    Erstelle dein Event zum Kicken!
                </div>
                <div className="offset-lg-1 offset-md-0 col-md-12 col-lg-6 d-flex flex-row justify-content-end">
                    <img className="w-100" src={require("../img/Fußballimage.png")} alt="Header"></img>
                </div>
            </div>
            <div className="row pt-5 pb-5">
                <div className="col-lg-7 col-md-12 text-center text-md-start">

                    <Link to={"/createEvent"}>
                        <SubmitButton size={"35px"} class={"ms-md-2 me-md-2"} text={"Event erstellen"}/></Link>
                </div>
            </div>
        </>
    );
};

export default HomeHeader;