import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useNavigate} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import axios from "axios";
import DOMPurify from "dompurify";
import {AutoComplete, Card, DatePicker, Form, Input, Space, TimePicker} from "antd";
import dayjs from "dayjs";
import {usePlacesWidget} from "react-google-autocomplete";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {Autocomplete} from "@react-google-maps/api";
import LocationSearch from "./LocationSearch";


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
    const [form] = Form.useForm()
    const [addressLabel, setAddressLabel] = useState(props.streetName + " " + props.houseNumber + ", " + props.city + ", Deutschland")


    function onChangeHtml(e) {
        setHtml(DOMPurify.sanitize(e.target.value))
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


    const submitChanges = () => {
        let startDate = ""
        let endDate = ""
        form.validateFields().then((values) => {


            if (mode === undefined) {
                if (!(startTime === undefined) && !(endTime === undefined)) {
                    startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                    endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                }


                axios.post(process.env.REACT_APP_BACKEND_URL + "/api/event", {
                    content: html,
                    title: values.title,
                    startDate: startDate,
                    endDate: endDate,
                    streetName: street,
                    houseNumber: houseNumber,
                    postalCode: postalCode,
                    city: city,
                    longitude: long,
                    latitude: lat
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

                axios.put(process.env.REACT_APP_BACKEND_URL + "/api/event/" + eventId, {
                    content: html,
                    title: values.title,
                    startDate: startDate,
                    endDate: endDate,
                    streetName: street,
                    houseNumber: houseNumber,
                    postalCode: postalCode,
                    city: city,
                    longitude: long,
                    latitude: lat
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
        }, (err) => {
            console.log(err)
        })


    }


    return (

        /*
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
        </div>*/
//TODO Validator function for all
        <div className="container">


            <Form form={form} layout={"vertical"}>
                <Card title={
                    <Form.Item initialValue={title} label="Titel" name="title" className="mt-3" rules={[
                        {
                            required: true,
                            message: 'Bitte einen Titel eingeben',
                        },
                    ]}><Input/></Form.Item>

                } bordered={false} className="bg-background-800 create-event-card mb-0 " actions={[
                    <div className="md:flex hidden flex-col justify-center text-white pt-2 cursor-default"
                         key="Location">
                        <div className="flex-row justify-center flex font-body label-text pb-2">
                            <LocationOnOutlinedIcon/>Standort
                        </div>
                        <LocationSearch setLong={setLong} setLang={setLat} setHouseNumber={setHouseNumber}
                                        setCity={setCity} setStreet={setStreet}
                                        setPostalCode={setPostalCode} addressLabel={addressLabel}></LocationSearch>
                    </div>,
                    <div className="md:flex hidden flex-col justify-center text-white pt-2 cursor-default"
                         key="Calendar">

                        <div className="flex flex-row justify-center pb-2 font-body"><CalendarMonthOutlinedIcon/>
                            Datum
                        </div>


                        <div><DatePicker id="datePicker" defaultValue={date} onChange={dateSelect} format="DD-MM-YYYY"
                                         disabledDate={disabledDate}/></div>
                    </div>,

                    <div className="md:flex hidden flex-col justify-center text-white pt-2 cursor-default" key="time">
                        <div className="flex flex-row justify-center pb-2 font-body"><AccessTimeIcon/>
                            Uhrzeit
                        </div>


                        <div className="px-2"><TimePicker.RangePicker defaultValue={[startTime, endTime]} format="HH:mm"
                                                                      onChange={timeSelect}
                                                                      minuteStep={30}/></div>
                    </div>,
                ]}>
                    <div className="text-black">
                        <Editor value={html} onChange={onChangeHtml}></Editor></div>
                </Card>


                {/*/FOR MOBILE*/}
                <div className="bg-background-900 flex-col flex justify-center pb-5">
                    <div className=" md:hidden">

                        <div className="flex-row justify-start flex font-body label-text pb-2 ml-3">
                            <LocationOnOutlinedIcon/>Standort
                        </div>
                        <div className="flex flex-row"><LocationSearch setLong={setLong} setLang={setLat}
                                                                       setHouseNumber={setHouseNumber}
                                                                       setCity={setCity} setStreet={setStreet}
                                                                       setPostalCode={setPostalCode}
                                                                       addressLabel={addressLabel}></LocationSearch></div>


                            <div className="text-white pt-2">

                            <div className="flex flex-row justify-start pb-2 ml-3 font-body">
                                <CalendarMonthOutlinedIcon/>
                                Datum
                            </div>
                            <div className="flex flex-row"><DatePicker className="w-5/6 mx-auto" id="datePicker"
                                                                       defaultValue={date}
                                                                       onChange={dateSelect} format="DD-MM-YYYY"
                                                                       disabledDate={disabledDate}/></div>
                        </div>
                        <div className=" text-white pt-2">
                            <div className="flex flex-row justify-start pb-2 font-body ml-3"><AccessTimeIcon/>
                                Uhrzeit
                            </div>


                            <div className="flex flex-row"><TimePicker.RangePicker className="w-5/6 mx-auto"
                                                                                   defaultValue={[startTime, endTime]}
                                                                                   format="HH:mm"
                                                                                   onChange={timeSelect}
                                                                                   minuteStep={30}/></div>
                        </div>

                    </div>

                    <div className="flex-row justify-center flex pt-5">
                        <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={submitChanges}>
                            <div
                                className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span
                                    className="relative font-body">                        {mode === "update" && "Änderungen speichern"}
                                    {mode === undefined && "Event erstellen"}</span>
                            </div>
                        </button>
                    </div>

                </div>
            </Form>

        </div>
    );
};

export default EventEditor;