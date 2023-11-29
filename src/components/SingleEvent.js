import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation, useParams} from "react-router-dom"
import axios from "axios";
import Comments from "./Comments";
import DOMPurify from "dompurify";



function SingleEvent(props) {
    const navigation = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const [event, setEvent] = useState({title: "",content: ""})




    useEffect(() => {
        const getEvent = async () =>
            await axios.get("https://localhost:8443/api/event/" + id)
                .then((res) => {
                    setEvent(res.data)

                }, (error) => {
                    console.log("Fehler bei der Anfrage " + error)
                })
        getEvent()
    },[]);


    return (


        <div className="container">
            <div className="jumbotron mt-3">
                <h1>{event.title}</h1>
                <p className="lead" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(event.content)}}></p>

                <p>StartDatum: {new Date(event.startDate).toLocaleString()} </p>
                <p>Enddate: {new Date(event.endDate).toLocaleString()}</p>
            </div>
            <hr className="my-4" />
            <Comments id={event.id}></Comments>

        </div>




)
;
}

export default SingleEvent;