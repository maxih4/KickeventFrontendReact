import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import Comments from "./Comments";
import DOMPurify from "dompurify";
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import EventEditor from "./EventEditor";
import dayjs from "dayjs";
import EventCard from "./EventCard";
import MapLocation from "./MapLocation";
import Loading from "./Loading";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {Divider} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


function SingleEvent(props) {
    const navigation = useNavigate()
    const {id} = useParams()
    const [event, setEvent] = useState({
        title: "",
        content: "",
        owner: "",
        id: 0,
        streetName: "",
        houseNumber: 0,
        postalCode: 0,
        city: ""
    })
    const isAuthenticated = useIsAuthenticated()
    const authUser = useAuthUser()
    let owner = false
    let admin = false
    const authHeader = useAuthHeader()
    if (isAuthenticated()) {
        owner = event.owner.userName === authUser().userName
        admin = authUser().roles.some((e) => e.name === "ADMIN")
    }
    const [editState, setEditState] = useState(false)
    const [toggleRefresh, setToggleRefresh] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        console.log()
        axios.get(process.env.REACT_APP_BACKEND_URL + "/api/event/" + id)
            .then((res) => {
                setLoading(false)
                setEvent(res.data)

            }, (error) => {
                console.log("Fehler bei der Anfrage " + error)
            })
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleRefresh]);

    const deleteEvent = () => {
        axios.delete(process.env.REACT_APP_BACKEND_URL + "/api/event/" + event.id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            // props.setToggleRefresh(prev=>!prev)
            navigation("/")
        }, (err) => {

        })
    }

    const editEvent = () => {
        setEditState(true)
    }

    return (<>

            {/*{
                !editState && !loading &&


                <div className="container bg-light pb-4 mt-5 main rounded-4">
                    <div className="mt-4 pt-3">
                        <EventCard event={event} button={false}></EventCard>
                    </div>
                    <hr className="my-4"/>
                    <div className=" mt-4 pt-3">


                        <h1>{event.title}</h1>
                        <p className="lead" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(event.content)}}></p>
                        <hr className="my-4"/>
                        <p style={{
                            fontFamily: "Inter",
                            fontWeight: "Bold",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>Beginn: {new Date(event.startDate).toLocaleString()} </p>
                        <p style={{
                            fontFamily: "Inter",
                            fontWeight: "Bold",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>Ende: {new Date(event.endDate).toLocaleString()}</p>
                        <hr className="my-4"/>
                        <p style={{
                            fontFamily: "Inter",
                            fontWeight: "Bold",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>Straße und Hausnummer: {event.streetName + " " + event.houseNumber}
                        </p>
                        <p style={{
                            fontFamily: "Inter",
                            fontWeight: "Bold",
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>PLZ und Ort: {event.postalCode + " " + event.city}
                        </p>
                        <MapLocation longitude={Number(event.longitude)}
                                     latitude={Number(event.latitude)}></MapLocation>

                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        {
                            (owner || admin) && <>
                                <button onClick={deleteEvent} className="m-2 ">Event löschen</button>
                                <button onClick={editEvent} className="m-2">Event editieren</button>

                                <hr className="my-4"/>
                            </>
                        }

                    </div>

                    <Comments id={event.id}></Comments>

                </div>
            }

            {
                editState && !loading &&
                <EventEditor title={event.title} html={event.content} streetName={event.streetName}
                             houseNumber={event.houseNumber}
                             postalCode={event.postalCode} city={event.city} date={dayjs(event.startDate)}
                             startTime={dayjs(event.startDate)} endTime={dayjs(event.endDate)} mode="update"
                             eventId={event.id}
                             setEditState={setEditState} setToggleRefresh={setToggleRefresh}
                             long={Number(event.longitude)}
                             lat={Number(event.latitude)}></EventEditor>


            }
            {loading && <Loading></Loading>}*/}

            {
                !editState && !loading && <>
                    <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 ">
                        <h1 className="text-text font-heading pl-1 pr-1">
                            {event.title}

                        </h1>
                        <div
                            className="flex flex-row lg:border-3 lg:hover:border-secondary-400 lg:border-solid rounded-full lg:border-secondary-300 justify-evenly lg:m-2 lg:ml-3 lg:mr-3">
                            <div className="flex flex-row justify-center text-secondary-300 font-heading m-2"
                                 key="Location">
                                <LocationOnOutlinedIcon/>
                                <div
                                    className="ps-1">{event.streetName + " " + event.houseNumber}, {event.postalCode + " " + event.city}</div>
                            </div>
                            <Divider type="vertical"
                                     className="h-6 -skew-x-12 bg-secondary-300 w-0.5 m-2 hidden lg:inline-block"></Divider>
                            <div className="flex flex-row justify-center text-secondary-300 font-heading m-2"
                                 key="Calendar">
                                <CalendarMonthOutlinedIcon/>
                                <div className="ps-1">{new Date(event.startDate).toLocaleDateString("de-De", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</div>
                            </div>
                            <Divider type="vertical"
                                     className="h-6 -skew-x-12 bg-secondary-300 w-0.5 m-2 hidden lg:inline-block"></Divider>
                            <div className="flex flex-row justify-center text-secondary-300 font-heading m-2" key="time">
                                <AccessTimeIcon/>
                                <div
                                    className="ps-1">{new Date(event.startDate).toLocaleString("de-DE", {hour: "2-digit"})} bis {new Date(event.endDate).toLocaleString("de-DE", {hour: "2-digit"})}</div>
                            </div>


                        </div>
                    </div>
                    <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                        <h3 className="text-text font-heading pl-1 pr-1">Über dieses Event</h3>
                        <p className="text-text-50 font-body m-3"
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(event.content)}}></p>
                    </div>

                    <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                        <h3 className="text-text font-heading pl-1 pr-1">Standort</h3>
                        <div className="m-3"><MapLocation longitude={Number(event.longitude)}
                                                          latitude={Number(event.latitude)}></MapLocation></div>
                    </div>


                    {
                        (owner || admin) && <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                            <h3 className="text-text font-heading pl-1 pr-1">Event Aktionen</h3>
                            <div className="flex flex-row justify-center">

                                <button className="bg-none bg-inherit border-none p-0 outline-inherit"
                                        onClick={editEvent}>
                                    <div
                                        className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-secondary-500 hover:bg-gradient-to-r hover:from-secondary-500 hover:to-secondary-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-secondary-400 transition-all ease-out duration-300 ml-1">
                                        <div
                                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                                        <div className="relative font-body"><EditOutlined/>
                                            Edit Event
                                        </div>
                                    </div>
                                </button>

                                <button className="bg-none bg-inherit border-none p-0 outline-inherit"
                                        onClick={deleteEvent}>
                                    <div
                                        className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-white-500 hover:to-white-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-white-400 transition-all ease-out duration-300 ml-1">
                                        <div
                                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                                        <div className="relative font-body"><DeleteOutlined/>
                                            Delete
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    }
                    <Comments id={event.id}></Comments>
                </>}
            {
                editState && !loading &&
                <EventEditor title={event.title} html={event.content} streetName={event.streetName}
                             houseNumber={event.houseNumber}
                             postalCode={event.postalCode} city={event.city} date={dayjs(event.startDate)}
                             startTime={dayjs(event.startDate)} endTime={dayjs(event.endDate)} mode="update"
                             eventId={event.id}
                             setEditState={setEditState} setToggleRefresh={setToggleRefresh}
                             long={Number(event.longitude)}
                             lat={Number(event.latitude)}></EventEditor>


            }
            {loading && <Loading></Loading>}
        </>

    )

}

export default SingleEvent;