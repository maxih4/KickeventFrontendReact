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
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + props.event.id)
            return await res.data
            },
            staleTime: 60000
        })
        prefetchClient.prefetchQuery({
            queryKey: ["comments",props.event.id.toString()],
            queryFn: async () => {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + props.event.id+ "/comment")
                return await res.data
            },
            staleTime: 60000
        })
    }
    const date = new Date(props.event.startDate);
    //const createdDate = new Date(props.event.createdDate)
    const navigate = useNavigate()
    return (
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
                    basedOn='words'/></div>
            </Card>
        </>
    );
}

export default EventCard;