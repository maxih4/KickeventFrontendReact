import React from 'react';
import {useNavigate} from "react-router-dom";
import DOMPurify from "dompurify";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HTMLEllipsis from "react-lines-ellipsis/lib/html.modern.mjs";
import {Card} from "antd";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from "axios";
import {useQueryClient} from "@tanstack/react-query";








function EventCard(props) {

    const prefetchClient = useQueryClient()

    const prefetch = ()=>{
        prefetchClient.prefetchQuery({
            queryKey: ["event",props.event.id.toString()],
            queryFn: async () => {
                const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/api/event/" + props.event.id)
            return await res.data
            },
            staleTime: 60000
        })
    }



    const date = new Date(props.event.startDate);
    //const createdDate = new Date(props.event.createdDate)
    const navigate = useNavigate()
    return (
        /*
        <>

            <div className="card eventCard">
                <div className="row g-0 row-cols-1 ">

                    <div className="text-center col-lg-2 col-md-4"
                         style={{backgroundColor: "$primary", backgroundSize: "cover", color: "white"}}>
                        <br/>
                        <br/>
                        <h2 style={{
                            fontFamily: "Outfit",
                            fontSize: "44px",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>{date.toLocaleString("de-De", {day: "numeric"}) + "."}</h2>
                        <br/>
                        <h2 style={{
                            fontFamily: "Outfit",
                            fontWeight: "bold",
                            fontSize: "44px",
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
                            style={{fontFamily: "Outfit", fontSize: "44px"}}><ResponsiveLineEllipsis
                            text={props.event.title}>


                        </ResponsiveLineEllipsis></h3>


                        <HTMLEllipsis
                            unsafeHTML={DOMPurify.sanitize(props.event.content)}
                            maxLine='3'

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


                                    <button onClick={() => navigate("/event/" + props.event.id)}
                                            className="rounded-pill"
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
                                    }}>Jetzt teilnehmen</span>
                                    </button>
                                }


                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <br/>
            </>*/


        <>
            <Card onMouseEnter={prefetch} onFocus={prefetch} hoverable onClick={() => navigate("/event/" + props.event.id)} title={<h2 className={"text-start"}>{props.event.title}</h2>}  bordered={false} className="bg-background-800 mb-7 "
                  //extra={<div>Vom {createdDate.toLocaleDateString()}</div>}
                  actions={[
                <div className="flex flex-row justify-center text-text-200 lg:text-xl" key="Location"> <div className="flex flex-col justify-center"><LocationOnOutlinedIcon  /> </div><div>{props.event.city}</div></div>,
                <div className="flex flex-row justify-center text-text-200 lg:text-xl" key="Calendar"> <div className="flex flex-col justify-center">
                    <CalendarMonthOutlinedIcon/></div>
                    <div>{date.toLocaleDateString("de-De", {
                        year: 'numeric',
                    month: 'long',
                    day: 'numeric',})}</div></div>,

                <div className="flex flex-row justify-center text-text-200 lg:text-xl" key="time"><div className="flex flex-col justify-center"> <AccessTimeIcon  /> </div><div>{date.toLocaleString("de-DE", {hour: "2-digit"})}</div></div>,
            ]}><div className="text-text-200">
                <HTMLEllipsis
                    unsafeHTML={DOMPurify.sanitize(props.event.content)}
                    maxLine='3'

                    basedOn='words'

                /></div>
            </Card>
        </>
    );
}

export default EventCard;