import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation, useParams} from "react-router-dom"
import axios from "axios";
import Comments from "./Comments";
import DOMPurify from "dompurify";
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import EventEditor from "./EventEditor";
import dayjs from "dayjs";
import EventCard from "./EventCard";


function SingleEvent(props) {
    const navigation = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const [event, setEvent] = useState({title: "", content: "", owner: "", id: 0, streetName:"", houseNumber:0,postalCode:0,city:""})
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
    const [toggleRefresh,setToggleRefresh] = useState(false)


    useEffect(() => {
        console.log()
        axios.get("https://localhost:8443/api/event/" + id)
                .then((res) => {
                    setEvent(res.data)

                }, (error) => {
                    console.log("Fehler bei der Anfrage " + error)
                })

    },[toggleRefresh]);

    const deleteEvent = () => {
        axios.delete("https://localhost:8443/api/event/" + event.id, {
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

    return (
<>
        {
    !editState &&


            <div className="container bg-light pb-4 mt-5 main rounded-4">
                <div className="mt-4 pt-3">
                    <EventCard event={event} button={false}></EventCard>
                </div>

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
                </div>
                {
                    (owner || admin) && <button onClick={deleteEvent}>Event löschen</button>
                }
                {
                    (owner || admin) && <button onClick={editEvent}>Event editieren</button>
                }
                <hr className="my-4"/>
                <Comments id={event.id}></Comments>

            </div>
        }

    {editState &&
        <EventEditor title={event.title} html={event.content} streetName={event.streetName} houseNumber={event.houseNumber} postalCode={event.postalCode} city={event.city} date={dayjs(event.startDate)} startTime={dayjs(event.startDate)} endTime={dayjs(event.endDate) } mode="update" eventId={event.id} setEditState={setEditState} setToggleRefresh={setToggleRefresh}></EventEditor>





    }
</>


)

}

export default SingleEvent;