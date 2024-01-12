import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useNavigate} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import axios from "axios";
import DOMPurify from "dompurify";
import {Alert, Card, DatePicker, Form, Input, TimePicker} from "antd";
import dayjs from "dayjs";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import LocationSearch from "./LocationSearch";
import Loading from "./Loading";
import {useMutation, useQueryClient} from "@tanstack/react-query";


const EventEditor = (props) => {

    const title = props.title
    const [html, setHtml] = useState(props.html);
    const [street, setStreet] = useState(props.streetName);
    const [houseNumber, setHouseNumber] = useState(props.houseNumber);
    const [postalCode, setPostalCode] = useState(props.postalCode);
    const [city, setCity] = useState(props.city);
    const authHeader = useAuthHeader()
    const [startTime, setStartTime] = useState(props.startTime)
    const [endTime, setEndTime] = useState(props.endTime)
    const [long, setLong] = useState(props.long)
    const [lat, setLat] = useState(props.lat)
    const [date, setDate] = useState(props.date)
    const mode = props.mode
    const eventId = props.eventId
    const [dateEdited, setDateEdited] = useState(false)
    const [form] = Form.useForm()
    const addressLabel = props.streetName + " " + props.houseNumber + ", " + props.city + ", Deutschland"

    const queryClient = useQueryClient()
    const navigate=useNavigate()


    const mutation = useMutation({
        mutationFn: () =>
            submitChanges(),
        onSuccess: (event) => {
            console.log(event)
            queryClient.setQueryData(["event", event.id.toString()], event)
            if(mode==="update"){
                props.setEditState(prev => !prev)
            }else{
                navigate("/event/" + event.id)
            }

        },
        onError:(error)=>console.log(error)


    })


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


    async function submitChanges() {
        let startDate = ""
        let endDate = ""


        if (mode === undefined) {
            if (!(startTime === undefined) && !(endTime === undefined)) {
                startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
            }


            return axios.post(process.env.REACT_APP_BACKEND_URL + "/api/event", {
                content: html,
                title: form.getFieldValue("title"),
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
            }).then((res) => res.data)

        } else {
            if (mode === undefined) {
                if (!(startTime === undefined) && !(endTime === undefined)) {
                    startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                    endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                }


                return axios.post(process.env.REACT_APP_BACKEND_URL + "/api/event", {
                    content: html,
                    title: form.getFieldValue("title"),
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
                }).then((res) => res.data)

            } else {
                if (!dateEdited) {
                    startDate = date.set("hour", startTime.get("hour")).set("minute", startTime.get("minute")).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                    endDate = date.set("hour", endTime.get("hour")).set("minute", endTime.get("minute")).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                } else {
                    startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                    endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")

                }
                return axios.put(process.env.REACT_APP_BACKEND_URL + "/api/event/" + eventId, {
                    content: html,
                    title: form.getFieldValue("title"),
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
                }).then((res) => res.data)

            }
        }


    }


    return (


//TODO Validator function for all
        //Todo wait spinner when clicking
        <>{mutation.isError && mutation.error.response &&
            <Alert message={mutation.error.response.data.message} className="container mb-2" type="error" showIcon/>

        }

            <div className="container">


                <Form form={form} layout={"vertical"}>
                    <Card title={
                        <Form.Item initialValue={title} label="Titel" name="title"
                                   className="mt-3" //rules={[{required: true, message: 'Bitte einen Titel eingeben',},]}
                        >
                            <Input/></Form.Item>

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


                            <div><DatePicker id="datePicker" defaultValue={date} onChange={dateSelect}
                                             format="DD-MM-YYYY"
                                             disabledDate={disabledDate}/></div>
                        </div>,

                        <div className="md:flex hidden flex-col justify-center text-white pt-2 cursor-default"
                             key="time">
                            <div className="flex flex-row justify-center pb-2 font-body"><AccessTimeIcon/>
                                Uhrzeit
                            </div>


                            <div className="px-2"><TimePicker.RangePicker defaultValue={[startTime, endTime]}
                                                                          format="HH:mm"
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
                                                                           addressLabel={addressLabel}></LocationSearch>
                            </div>


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
                            {mutation.isPending ? <Loading></Loading> :
                                <button className="bg-none bg-inherit border-none p-0 outline-inherit"
                                        onClick={(e) => {
                                            mutation.reset()
                                            mutation.mutate()
                                        }}>
                                    <div
                                        className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        <span
                                            className="relative font-body">                        {mode === "update" && "Änderungen speichern"}
                                            {mode === undefined && "Event erstellen"}</span>
                                    </div>
                                </button>}

                        </div>

                    </div>
                </Form>

            </div>
        </>
    );
}


export default EventEditor;