import React from 'react';
import { useNavigate} from "react-router-dom";
import imgurl from "../img/Fußballimage.webp"

const HomeHeader = () => {
const navigate = useNavigate()

    return (
        /* <>
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
         </>*/
        <div className="container grid xl:grid-cols-5 md:grid-cols-7 grid-cols-1">
            <h1 className="text-text font-body xl:text-5xl md:text-4xl text-3xl col-span-3 xl:col-span-2">Erstelle
                dein <span
                    className="text-primary-400 font-bold">Event</span> zum <span
                    className="text-primary-400 font-bold">Kicken</span> & finde heute noch passende Mitspieler</h1>
            <div className=""></div>
            <img className="w-full xl:col-span-2 col-span-3 my-auto" src={imgurl}
                 alt="Header"></img>
            <div className="pt-4 flex justify-center md:justify-normal col-span-2">
                <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={()=>navigate("/createEvent")}>
                    <div
                        className="inline-flex items-center justify-center h-16 px-8 py-0 text-xl font-semibold text-center text-text no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-white-500 border-solid rounded-full cursor-pointer select-none hover:text-primary-400 hover:border-primary-400 focus:shadow-xs focus:no-underline">
                        Event erstellen!
                    </div>
                </button>
            </div>
        </div>
    );
};

export default HomeHeader;