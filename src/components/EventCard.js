import React from 'react';
import { useNavigate} from "react-router-dom";
import DOMPurify from "dompurify";

import HTMLEllipsis from "react-lines-ellipsis/lib/html.modern.mjs";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC.modern.mjs";

const ResponsiveLineEllipsis = responsiveHOC()(LinesEllipsis)


function EventCard(props) {
    const date = new Date(props.event.startDate);
    const createdDate = new Date(props.event.createdDate)
    const navigate = useNavigate()
    return (

        <>

            <div className="card eventCard">
                <div className="row g-0 row-cols-1 ">

                    <div className="text-center col-lg-2 col-md-4"
                         style={{backgroundColor: "#77BB41", backgroundSize: "cover", color: "white"}}>
                        <br/>
                        <br/>
                        <h2 style={{
                            fontFamily: "Outfit",
                            fontSize: "80px",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>{date.toLocaleString("de-De", {day: "numeric"}) + "."}</h2>
                        <br/>
                        <h2 style={{
                            fontFamily: "Outfit",
                            fontWeight: "bold",
                            fontSize: "81px",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>{date.toLocaleString("de-De", {month: "short"})}</h2>
                        <p style={{
                            color: "black", fontFamily: "Inter",
                            fontWeight: "Bold",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>Erstellt am: {createdDate.toLocaleString("de-De")}</p>
                    </div>


                    <div className="card-body col-lg-10 col-md-8 text-center">

                        <h3 className="card-title"
                            style={{fontFamily: "Outfit", fontSize: "64px"}}><ResponsiveLineEllipsis
                            text={props.event.title}>


                        </ResponsiveLineEllipsis></h3>


                        <HTMLEllipsis
                            unsafeHTML={DOMPurify.sanitize(props.event.content)}
                            maxLine='6'

                            basedOn='letters'
                        />

                        <br/>
                        <div className="d-flex flex-row flex-wrap justify-content-around"
                             style={{
                                 fontFamily: "Inter",
                                 fontWeight: "Bold",
                                 textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                             }}>
                            <div className="p-2">{props.event.streetName + " " + props.event.houseNumber}
                                <br/>
                                {props.event.postalCode + " " + props.event.city}
                            </div>
                            <p className="p-2 " style={{
                                fontFamily: "Inter",
                                fontWeight: "Bold",
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }}>{date.toLocaleString("de-DE", {hour: "2-digit"})}</p>
                            <div className="p-2">
                                {props.button &&

                                    /*<button className="" style={{
                                borderRadius: "61px",
                                backgroundColor: "#77BB41",
                                borderColor: "#77BB41",
                                width: "255px",
                                borderStyle: "solid",
                                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.35)"
                            }}>
                                <Link to={"/event/" + props.event.id} style={{
                                    textDecoration: "none",
                                    color: "black",
                                    fontFamily: "Outfit",
                                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    fontSize: "27px"
                                }}> Jetzt
                                    teilnehmen </Link></button>
                                    **/

                                    <button onClick={() => navigate("/event/" + props.event.id)}
                                            className="rounded-pill"
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
                                    }}>Jetzt teilnehmen</span>
                                    </button>
                                }


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