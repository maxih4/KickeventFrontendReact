import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useNavigate} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import axios from "axios";
import DOMPurify from "dompurify";
import {DatePicker, TimePicker} from "antd";
import dayjs from "dayjs";
import {usePlacesWidget} from "react-google-autocomplete";


const EventEditor = (props) => {

    const [title, setTitle] = useState(props.title)
    const [html, setHtml] = useState(props.html);
    const [street, setStreet] = useState(props.streetName);
    const [houseNumber, setHouseNumber] = useState(props.houseNumber);
    const [postalCode, setPostalCode] = useState(props.postalCode);
    const [city, setCity] = useState(props.city);
    const authHeader = useAuthHeader()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const [startTime, setStartTime] = useState(props.startTime)
    const [endTime, setEndTime] = useState(props.endTime)
    const [long, setLong] = useState(props.long)
    const [lat, setLat] = useState(props.lat)
    const [date, setDate] = useState(props.date)
    const mode = props.mode
    const eventId = props.eventId
    const [dateEdited, setDateEdited] = useState(false)


    function onChangeHtml(e) {
        setHtml(DOMPurify.sanitize(e.target.value))
    }

    function onChangeTitle(e) {
        setTitle(e.target.value);
    }

    function onChangeStreet(e) {
        setStreet(e.target.value);
    }

    function onChangeHouseNumber(e) {
        setHouseNumber(e.target.value);
    }

    function onChangePostalCode(e) {
        setPostalCode(e.target.value);
    }

    function onChangeCity(e) {
        setCity(e.target.value);
    }


    function dateSelect(date, dateString) {

        setDate(dayjs(dateString, "DD-MM-YYYY"))
    }

    function timeSelect(time, timeString) {
        setStartTime(timeString[0])
        setEndTime(timeString[1])
        setDateEdited(true)
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < new Date()
    };

    function onMapSelected(place) {

        setHouseNumber("")
        setCity("")
        setPostalCode("")
        setStreet("")
        setLat(place.geometry.location.lat().toString())
        setLong(place.geometry.location.lng().toString())
        console.log(lat)
        console.log(long)

        place.address_components.forEach((components) => {
            switch (components.types[0]) {
                case "street_number": {
                    setHouseNumber(components.long_name)
                    break;
                }
                case "route": {
                    setStreet(components.short_name)
                    break;
                }
                case "postal_code": {
                    setPostalCode(components.long_name)
                    break;
                }
                case "locality": {
                    setCity(components.long_name)
                    break;
                }
                default:{
                    return;
                }

            }})


    }


    const streetRef = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: place => onMapSelected(place),
        options: {
            componentRestrictions: {country: "de"},
            types: ["address"],
            fields: ["address_components,geometry.location"]
        },
        libraries: ["places"]

    })


    const submitChanges = () => {
        let startDate = ""
        let endDate = ""

        if (mode === undefined) {
            if (!(startTime === undefined) && !(endTime === undefined)) {
                startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
            }


            axios.post("https://localhost:8443/api/event", {
                content: html,
                title: title,
                startDate: startDate,
                endDate: endDate,
                streetName: street,
                houseNumber: houseNumber,
                postalCode: postalCode,
                city: city,
                longitude: long.toString(),
                latitude: lat.toString()
            }, {
                headers: {
                    "Authorization": authHeader()
                }
            }).then((res) => {

                navigate("/event/" + res.data.id)
            }, (err) => {
                console.log(err)
                setErrorMessage(err.response.data.message)
                setError(true)
            })
        } else {
            if (!dateEdited) {
                startDate = date.set("hour", startTime.get("hour")).set("minute", startTime.get("minute")).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                endDate = date.set("hour", endTime.get("hour")).set("minute", endTime.get("minute")).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
            } else {
                startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")

            }

            axios.put("https://localhost:8443/api/event/" + eventId, {
                content: html,
                title: title,
                startDate: startDate,
                endDate: endDate,
                streetName: street,
                houseNumber: houseNumber,
                postalCode: postalCode,
                city: city,
                longitude: long.toString(),
                latitude: lat.toString()
            }, {
                headers: {
                    "Authorization": authHeader()
                }
            }).then((res) => {

                props.setEditState(prev => !prev)
                props.setToggleRefresh(prev => !prev)
            }, (err) => {
                console.log(err)
                setErrorMessage(err.response.data.message)
                setError(true)
            })
        }
    }


    return (
        <div className="container main">
            <div className="mt-5 bg-light p-5 pt-2 pb-4 rounded-4 ">
                {error && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="titleInput" className="form-label"><h2>Titel</h2></label>
                        <input type="text" className="form-control" id="titleInput" onChange={onChangeTitle}
                               value={title}/>
                    </div>

                </form>
                <h2>Inhalt</h2>
                <Editor value={html} onChange={onChangeHtml}
                        containerProps={{style: {backgroundColor: "white"}}}></Editor>
                <br/>
                <div className="d-flex flex-row justify-content-evenly mb-4 flex-wrap">
                    <div><label htmlFor="streetInput" className="form-label">Straße</label>
                        <input type="text" className="form-control" id="streetInput"
                               value={street} ref={streetRef.ref} onChange={onChangeStreet}/>
                    </div>
                    <div><label htmlFor="houseNumberInput" className="form-label">Hausnummer</label>
                        <input type="text" className="form-control" id="houseNumberInput"
                               value={houseNumber} onChange={onChangeHouseNumber}/>

                    </div>
                    <div><label htmlFor="postalCodeInput" className="form-label">PLZ</label>
                        <input type="text" className="form-control" id="postalCodeInput"
                               value={postalCode} onChange={onChangePostalCode}/>
                    </div>
                    <div><label htmlFor="cityInput" className="form-label">Ort</label>
                        <input type="text" className="form-control" id="cityInput"
                               value={city} onChange={onChangeCity}/>

                    </div>
                </div>


                <div className="d-flex flex-row justify-content-evenly mb-4 flex-wrap">
                    <div className="mb-2"> Datum:<br/>
                        <DatePicker id="datePicker" defaultValue={date} onChange={dateSelect} format="DD-MM-YYYY"
                                    disabledDate={disabledDate}/>
                    </div>
                    <div className="mb-2">
                        Uhrzeit von - bis: <br/>
                        <TimePicker.RangePicker defaultValue={[startTime, endTime]} format="HH:mm" onChange={timeSelect}
                                                minuteStep={15}/>
                    </div>
                </div>

                <br/>
                <div className="text-center">
                    <button onClick={submitChanges} className="rounded-5">
                        {mode === "update" && "Änderungen speichern"}
                        {mode === undefined && "Event erstellen"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventEditor;