import React from 'react';
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";

import HTMLEllipsis from "react-lines-ellipsis/lib/html.modern.mjs";
import LinesEllipsis from "react-lines-ellipsis";



function EventCard(props) {
    const handleReflow = (e) => {
        return e.clamped
    }

    let date = new Date(props.event.startDate);
    return (

        <>

            <div className="card eventCard">
                <div className="row g-0 row-cols-1 ">

                    <div className="text-center col-2"
                         style={{backgroundColor: "#77BB41", backgroundSize: "cover", color: "white"}}>
                        <br/>
                        <br/>
                        <h2 style={{
                            fontFamily: "Judson",
                            fontSize: "80px"
                        }}>{date.toLocaleString("de-De", {day: "numeric"})}</h2>
                        <br/>
                        <h2 style={{
                            fontFamily: "Kameron",
                            fontWeight: "bold",
                            fontSize: "81px"
                        }}>{date.toLocaleString("de-De",{month:"short"} )}</h2>

                    </div>


                    <div className="card-body col-10 text-center">

                        <h3 className="card-title"
                            style={{fontFamily: "Outfit", fontSize: "64px"}}> <LinesEllipsis text={props.event.title}>


                        </LinesEllipsis></h3>


                        <HTMLEllipsis
                            unsafeHTML={DOMPurify.sanitize(props.event.content)}
                            maxLine='6'

                            basedOn='letters'
                        />

                        <br/>
                        <div className="d-flex flex-row justify-content-around" style={{fontFamily:"Inter",fontWeight:"Bold"}}>
                            <div className="p-2">{props.event.streetName + " "+ props.event.houseNumber}
                                <br/>
                                {props.event.city}
                            </div>
                            <p className="p-2" style={{fontFamily:"Inter",fontWeight:"Bold"}}>{date.toLocaleString("de-DE",{hour:"2-digit"})}</p>
                            <div className="p-2">
                                <button className="" style={{borderRadius:"61px",backgroundColor: "#77BB41",borderColor: "#77BB41",width:"255px",
                                    borderStyle: "solid"}}>
                                    <Link to={"/event/" + props.event.id} style={{textDecoration: "none", color:"black",fontFamily:"Outfit", fontWeight:"bold",fontSize:"27px"}}> Jetzt
                                        teilnehmen </Link></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <br/>
        </>
    );
}

export default EventCard;