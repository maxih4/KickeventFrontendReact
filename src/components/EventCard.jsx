import React from 'react';
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import HTMLEllipsis from "react-lines-ellipsis/lib/html.modern.mjs";
import {Card} from "antd";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from "axios";
import {useQueryClient} from "@tanstack/react-query";

function EventCard({event}) {
    const prefetchClient = useQueryClient();
    const date = new Date(event.startDate);

    const prefetch = () => {
        prefetchClient.prefetchQuery({
            queryKey: ["event", event.id.toString()],
            queryFn: async () => {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + event.id);
                return res.data;
            },
            staleTime: 60000
        });
        prefetchClient.prefetchQuery({
            queryKey: ["comments", event.id.toString()],
            queryFn: async () => {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + event.id + "/comment");
                return res.data;
            },
            staleTime: 60000
        });
    };

    return (
        <Link
            className="event-card-link"
            onFocus={prefetch}
            onMouseEnter={prefetch}
            to={`/event/${event.id}`}
        >
            <Card className="event-card" variant="outlined">
                <article className="event-card-content">
                    <h3>{event.title}</h3>
                    <div className="event-description">
                        <HTMLEllipsis
                            unsafeHTML={DOMPurify.sanitize(event.content)}
                            maxLine="3"
                            basedOn="words"
                        />
                    </div>
                    <div className="event-meta" aria-label="Eventdetails">
                        <div className="event-meta-item">
                            <span className="event-meta-icon" aria-hidden="true"><LocationOnOutlinedIcon/></span>
                            <span>{event.city}</span>
                        </div>
                        <div className="event-meta-item">
                            <span className="event-meta-icon" aria-hidden="true"><CalendarMonthOutlinedIcon/></span>
                            <span>{date.toLocaleDateString("de-DE", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</span>
                        </div>
                        <div className="event-meta-item">
                            <span className="event-meta-icon" aria-hidden="true"><AccessTimeIcon/></span>
                            <span>{date.toLocaleString("de-DE", {hour: "2-digit"})}</span>
                        </div>
                    </div>
                </article>
            </Card>
        </Link>
    );
}

export default EventCard;
