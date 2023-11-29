import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import axios from "axios";
import DOMPurify from "dompurify";
import {DatePicker, TimePicker} from "antd";
const { RangePicker } = DatePicker;

const CreateEvent = () => {
    const [title, setTitle] = useState("")
    const [html, setHtml] = useState("");
    const authHeader = useAuthHeader()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [date,setDate] = useState("")

    function onChangeHtml(e) {
        setHtml(DOMPurify.sanitize(e.target.value))
    }

    function onChangeTitle(e) {
        setTitle(e.target.value);
    }


    function dateSelect(date, dateString) {
        console.log("Date: "+dateString)
        setDate(dateString)
    }

    function timeSelect(time, timeString) {
        console.log("Starttime: "+timeString[0])
        console.log("Endtime: "+timeString[1])
        setStartTime(timeString[0])
        setEndTime(timeString[1])

    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < new Date()
    };

    const submitChanges = () => {
        setError(false)
        console.log(new Date())

        console.log(new Date(date.split("-").reverse().join("-")+"T"+startTime))

        axios.post("https://localhost:8443/api/event", {
            content: html,
            title: title,
            startDate: new Date(date.split("-").reverse().join("-")+"T"+startTime),
            endDate: new Date(date.split("-").reverse().join("-")+"T"+endTime)

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

    }


    return (
        <div className="container">
            {error && <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>}
            <form>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label"><h2>Titel</h2></label>
                    <input type="text" className="form-control" id="titleInput" onChange={onChangeTitle}/>
                </div>

            </form>
            <h2>Inhalt</h2>
            <Editor value={html} onChange={onChangeHtml}
                    containerProps={{style: {backgroundColor: "white"}}}></Editor>
            <br/>

            <DatePicker onChange={dateSelect} format="DD-MM-YYYY" disabledDate={disabledDate}/>
            <br/>
            <TimePicker.RangePicker format="HH:mm" onChange={timeSelect} minuteStep={15}/>
            <br/>
            <button onClick={submitChanges} className="rounded-5">

                Änderungen speichern
            </button>
        </div>
    );
};

export default CreateEvent;