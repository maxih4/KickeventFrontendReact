import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import Comments from "../components/Comments";
import DOMPurify from "dompurify";
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import EventEditor from "./EventEditor";
import dayjs from "dayjs";
import MapLocation from "../components/MapLocation";
import Loading from "../components/Loading";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {Divider, Spin} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function SingleEvent(props) {
    const navigation = useNavigate()
    const {id} = useParams()
    const isAuthenticated = useIsAuthenticated()
    const authUser = useAuthUser()
    const [owner,setOwner] = useState(false)
    const [admin,setAdmin] = useState(false)
    const [loading,setLoading] = useState(false)
    const authHeader = useAuthHeader()
    const [editState, setEditState] = useState(false)
    const query=useQueryClient()
    const eventQuery = useQuery({
        queryKey: ["event", id],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id)

            return await res.data
        },
    })
    useEffect(() => {
        window.scrollTo({top:-20})
        if (isAuthenticated() && !eventQuery.isLoading) {
            setOwner(eventQuery.data.owner.userName === authUser().userName)
           setAdmin(authUser().roles.some((e) => e.name === "ADMIN"))
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventQuery.isLoading]);
    const mutation = useMutation(({
        mutationFn: ()=>deleteEvent(),
        onSuccess: ()=>query.invalidateQueries({queryKey:["event",id]}),
        onSettled:()=> {
            setLoading(false)
            navigation("/")
        },
        onError:(err)=> {
            setLoading(false)
            console.log(err)
        }
    }))

    const deleteEvent = async () => {
        setLoading(true)
        return axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) =>res.data)    }
    const editEvent = () => {
        setEditState(true)
    }
    return (<>
            {
                !editState && !eventQuery.isLoading && <>
                    <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 ">
                        <h1 className="text-text font-heading pl-1 pr-1">
                            {eventQuery.data.title}
                        </h1>
                        <div
                            className="flex flex-row lg:border-3 lg:hover:border-secondary-400 lg:border-solid rounded-full lg:border-secondary-300 justify-evenly lg:m-2 lg:ml-3 lg:mr-3">
                            <div className="flex flex-row justify-center text-secondary-300 font-heading m-2"
                                 key="Location">
                                <LocationOnOutlinedIcon/>
                                <div
                                    className="ps-1">{eventQuery.data.streetName + " " + eventQuery.data.houseNumber}, {eventQuery.data.postalCode + " " + eventQuery.data.city}</div>
                            </div>
                            <Divider type="vertical"
                                     className="h-6 -skew-x-12 bg-secondary-300 w-0.5 m-2 hidden lg:inline-block"></Divider>
                            <div className="flex flex-row justify-center text-secondary-300 font-heading m-2"
                                 key="Calendar">
                                <CalendarMonthOutlinedIcon/>
                                <div className="ps-1">{new Date(eventQuery.data.startDate).toLocaleDateString("de-De", {
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
                                    className="ps-1">{new Date(eventQuery.data.startDate).toLocaleString("de-DE", {hour: "2-digit"})} bis {new Date(eventQuery.data.endDate).toLocaleString("de-DE", {hour: "2-digit"})}</div>
                            </div>
                        </div>
                    </div>
                    <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                        <h3 className="text-text font-heading pl-1 pr-1">Über dieses Event</h3>
                        <p className="text-text-50 font-body m-3"
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eventQuery.data.content)}}></p>
                    </div>
                    <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                        <h3 className="text-text font-heading pl-1 pr-1">Standort</h3>
                        <div className="m-3"><MapLocation longitude={Number(eventQuery.data.longitude)}
                                                          latitude={Number(eventQuery.data.latitude)}></MapLocation></div>
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
                                        onClick={mutation.mutate}>
                                    <div
                                        className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-white-500 hover:to-white-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-white-400 transition-all ease-out duration-300 ml-1">
                                        <div
                                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                                        <div className="relative font-body">{loading ?<> <Spin ></Spin> Wait</> : <><DeleteOutlined/>
                                            Delete</>}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    }
                    <Comments id={eventQuery.data.id}></Comments>
                </>}
            {
                editState && !eventQuery.isLoading &&
                <EventEditor title={eventQuery.data.title} html={eventQuery.data.content} streetName={eventQuery.data.streetName}
                             houseNumber={eventQuery.data.houseNumber}
                             postalCode={eventQuery.data.postalCode} city={eventQuery.data.city} date={dayjs(eventQuery.data.startDate)}
                             startTime={dayjs(eventQuery.data.startDate)} endTime={dayjs(eventQuery.data.endDate)} mode="update"
                             eventId={eventQuery.data.id}
                             setEditState={setEditState}
                             long={Number(eventQuery.data.longitude)}
                             lat={Number(eventQuery.data.latitude)}></EventEditor>
            }
            {eventQuery.isLoading && <Loading></Loading>}
        </>
    )
}

export default SingleEvent;