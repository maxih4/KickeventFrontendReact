import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import DOMPurify from "dompurify";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import EventEditor from "./EventEditor";
import dayjs from "dayjs";
import MapLocation from "../components/MapLocation";
import Loading from "../components/Loading";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {Button, Card} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function SingleEvent() {
    const navigate = useNavigate();
    const {id} = useParams();
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser();
    const [loading, setLoading] = useState(false);
    const authHeader = useAuthHeader();
    const [editState, setEditState] = useState(false);
    const query = useQueryClient();
    const eventQuery = useQuery({
        queryKey: ["event", id],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id);
            return res.data;
        },
    });
    const owner = Boolean(isAuthenticated && eventQuery.data && authUser && eventQuery.data.owner.userName === authUser.userName);
    const admin = Boolean(isAuthenticated && authUser?.roles?.some((role) => role.name === "ADMIN"));

    useEffect(() => {
        window.scrollTo({top: -20});
    }, []);

    const mutation = useMutation({
        mutationFn: () => deleteEvent(),
        onSuccess: () => query.invalidateQueries({queryKey: ["event", id]}),
        onSettled: () => {
            setLoading(false);
            navigate("/");
        },
        onError: (err) => {
            setLoading(false);
            console.log(err);
        }
    });

    const deleteEvent = async () => {
        setLoading(true);
        return axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id, {
            headers: {
                "Authorization": authHeader
            }
        }).then((res) => res.data);
    };

    const editEvent = () => {
        setEditState(true);
    };

    if (eventQuery.isLoading) {
        return <Loading/>;
    }

    return (
        <div className="mx-auto w-[calc(100%-1.5rem)] max-w-[1232px] pb-10 pt-5 sm:w-[calc(100%-2rem)] sm:pb-[60px] sm:pt-7">
            {!editState && eventQuery.data && <>
                <Card
                    className="shadow-lg"
                    styles={{body: {padding: 0}}}
                    variant="outlined"
                >
                    <div className="p-6 max-[640px]:px-4 max-[640px]:py-5 sm:px-[26px]">
                        <h1 className="m-0 font-heading text-[27px] font-[650] leading-[1.12] tracking-[-0.035em] text-slate-900 dark:text-text sm:text-[32px]">{eventQuery.data.title}</h1>
                        <div className="mt-5 grid overflow-hidden rounded-[10px] border border-slate-300 bg-slate-50 dark:border-background-600 dark:bg-background-950 sm:grid-cols-[minmax(0,1.4fr)_minmax(190px,.8fr)_minmax(240px,.9fr)]" aria-label="Eventdetails">
                            <div className="flex min-h-[52px] min-w-0 items-center justify-start gap-2 px-[18px] py-2.5 text-start text-slate-600 dark:text-text-300 max-[640px]:min-h-12">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><LocationOnOutlinedIcon fontSize="inherit"/></span>
                                <span>{eventQuery.data.streetName + " " + eventQuery.data.houseNumber}, {eventQuery.data.postalCode + " " + eventQuery.data.city}</span>
                            </div>
                            <div className="flex min-h-[52px] min-w-0 items-center justify-start gap-2 border-t border-slate-200 px-[18px] py-2.5 text-start text-slate-600 dark:border-background-800 dark:text-text-300 max-[640px]:min-h-12 sm:border-s sm:border-t-0">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><CalendarMonthOutlinedIcon fontSize="inherit"/></span>
                                <span>{new Date(eventQuery.data.startDate).toLocaleDateString("de-DE", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</span>
                            </div>
                            <div className="flex min-h-[52px] min-w-0 items-center justify-start gap-2 border-t border-slate-200 px-[18px] py-2.5 text-start text-slate-600 dark:border-background-800 dark:text-text-300 max-[640px]:min-h-12 sm:border-s sm:border-t-0">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><AccessTimeIcon fontSize="inherit"/></span>
                                <span>{new Date(eventQuery.data.startDate).toLocaleString("de-DE", {hour: "2-digit"})} bis {new Date(eventQuery.data.endDate).toLocaleString("de-DE", {hour: "2-digit"})}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="mt-4 grid gap-4 min-[901px]:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
                    <Card
                        className="shadow-md"
                        styles={{body: {padding: 0}}}
                        variant="outlined"
                    >
                        <div className="min-h-[258px] p-[22px_24px] max-[640px]:min-h-0 max-[640px]:px-4 max-[640px]:py-5">
                            <h2 className="m-0 font-heading text-lg font-[650] leading-tight tracking-[-0.035em] text-slate-900 dark:text-text">Über dieses Event</h2>
                            <div
                                className="break-words pt-4 leading-[1.65] text-slate-600 dark:text-text-300 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0"
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eventQuery.data.content)}}
                            />
                        </div>
                    </Card>
                    <Card
                        className="shadow-md"
                        styles={{body: {padding: 0}}}
                        variant="outlined"
                    >
                        <div className="min-h-[258px] p-[22px_24px] max-[640px]:min-h-0 max-[640px]:px-4 max-[640px]:py-5">
                            <h2 className="m-0 font-heading text-lg font-[650] leading-tight tracking-[-0.035em] text-slate-900 dark:text-text">Standort</h2>
                            <MapLocation
                                latitude={Number(eventQuery.data.latitude)}
                                longitude={Number(eventQuery.data.longitude)}
                            />
                        </div>
                    </Card>
                </div>

                {(owner || admin) && (
                    <div className="mt-4">
                        <Card
                            styles={{body: {padding: 0}}}
                            variant="outlined"
                        >
                            <div className="flex items-center justify-between gap-4 p-[18px_24px] max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:p-5">
                                <h2 className="m-0 font-heading text-lg font-[650] leading-tight tracking-[-0.035em] text-slate-900 dark:text-text">Event Aktionen</h2>
                                <div className="flex flex-wrap justify-end gap-2.5 max-[640px]:justify-start">
                                    <Button
                                        className="!min-h-10 !rounded-[9px] !border-secondary-500 !bg-secondary-500 !px-4 !font-[650] !text-white hover:!border-secondary-400 hover:!bg-secondary-400 max-[640px]:flex-1"
                                        icon={<EditOutlined fontSize="small"/>}
                                        onClick={editEvent}
                                    >
                                        Edit Event
                                    </Button>
                                    <Button
                                        className="!min-h-10 !rounded-[9px] !border-red-500 !bg-red-500 !px-4 !font-[650] !text-white hover:!border-red-400 hover:!bg-red-400 max-[640px]:flex-1"
                                        danger
                                        icon={<DeleteOutlined fontSize="small"/>}
                                        loading={loading}
                                        onClick={mutation.mutate}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                <Comments id={eventQuery.data.id}/>
            </>}

            {editState && eventQuery.data && (
                <EventEditor
                    city={eventQuery.data.city}
                    date={dayjs(eventQuery.data.startDate)}
                    endTime={dayjs(eventQuery.data.endDate)}
                    eventId={eventQuery.data.id}
                    html={eventQuery.data.content}
                    houseNumber={eventQuery.data.houseNumber}
                    lat={Number(eventQuery.data.latitude)}
                    long={Number(eventQuery.data.longitude)}
                    mode="update"
                    postalCode={eventQuery.data.postalCode}
                    setEditState={setEditState}
                    startTime={dayjs(eventQuery.data.startDate)}
                    streetName={eventQuery.data.streetName}
                    title={eventQuery.data.title}
                />
            )}
        </div>
    );
}

export default SingleEvent;
