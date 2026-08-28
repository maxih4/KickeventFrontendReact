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
            className="group block text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
            onFocus={prefetch}
            onMouseEnter={prefetch}
            to={`/event/${event.id}`}
        >
            <Card
                className="m-0 rounded-[14px] shadow-none transition-[border-color,background-color,transform] duration-150 ease-out group-hover:-translate-y-px group-hover:border-slate-400 group-hover:bg-slate-50 dark:group-hover:border-background-500 dark:group-hover:bg-background-900"
                classNames={{body: "p-5 pb-0 max-[640px]:px-4 max-[640px]:pt-[18px]"}}
                variant="outlined"
            >
                <article>
                    <h3 className="m-0 font-heading text-lg font-[650] leading-tight text-slate-900 dark:text-text">{event.title}</h3>
                    <div className="min-h-[45px] break-words pt-2 leading-normal text-slate-600 dark:text-text-300">
                        <HTMLEllipsis
                            unsafeHTML={DOMPurify.sanitize(event.content)}
                            maxLine="3"
                            basedOn="words"
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-1 border-t border-slate-200 dark:border-background-800 sm:grid-cols-3" aria-label="Eventdetails">
                        <div className="flex min-w-0 min-h-[42px] items-center justify-start gap-2 px-0 py-2.5 text-start text-slate-600 dark:text-text-300 sm:min-h-12 sm:justify-center sm:px-3 sm:text-center">
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><LocationOnOutlinedIcon fontSize="inherit"/></span>
                            <span>{event.city}</span>
                        </div>
                        <div className="flex min-w-0 min-h-[42px] items-center justify-start gap-2 border-t border-slate-200 px-0 py-2.5 text-start text-slate-600 dark:border-background-800 dark:text-text-300 sm:min-h-12 sm:justify-center sm:border-s-1 sm:border-t-0 sm:px-3 sm:text-center">
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><CalendarMonthOutlinedIcon fontSize="inherit"/></span>
                            <span>{date.toLocaleDateString("de-DE", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</span>
                        </div>
                        <div className="flex min-w-0 min-h-[42px] items-center justify-start gap-2 border-t border-slate-200 px-0 py-2.5 text-start text-slate-600 dark:border-background-800 dark:text-text-300 sm:min-h-12 sm:justify-center sm:border-s-1 sm:border-t-0 sm:px-3 sm:text-center">
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><AccessTimeIcon fontSize="inherit"/></span>
                            <span>{date.toLocaleString("de-DE", {hour: "2-digit"})}</span>
                        </div>
                    </div>
                </article>
            </Card>
        </Link>
    );
}

export default EventCard;
