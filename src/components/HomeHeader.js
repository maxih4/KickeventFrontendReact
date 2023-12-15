import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import SubmitButton from "./SubmitButton";

const HomeHeader = () => {
    const navigate = useNavigate()


    return (
        <>
            <div className="row pb-5 pt-5">

            </div>
            <div className="row pt-5">
                <div className="col-5 text-white" style={{fontFamily: "Outfit", fontSize: "80px", fontWeight: "bold"}}>
                    Erstelle dein Event zum Kicken!
                </div>
                <div className="offset-1 col-6 d-flex flex-row justify-content-end">
                    <img src={require("../img/Fußballimage.png")} alt="Header"></img>
                </div>
            </div>
            <div className="row pt-5 pb-5">
                <div className="col-7">

                    <Link to={"/createEvent"}>
                        <SubmitButton size={"44px"} class={"ms-5 me-5"} text={"Event erstellen"}/></Link>
                </div>
            </div>
        </>
    );
};

export default HomeHeader;