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
        <div className="page-container single-event-page">
            {!editState && eventQuery.data && <>
                <Card className="event-summary-card" variant="outlined">
                    <h1 className="event-summary-title">{eventQuery.data.title}</h1>
                    <div className="event-summary-meta" aria-label="Eventdetails">
                        <div className="event-meta-item">
                            <span className="event-meta-icon" aria-hidden="true"><LocationOnOutlinedIcon/></span>
                            <span>{eventQuery.data.streetName + " " + eventQuery.data.houseNumber}, {eventQuery.data.postalCode + " " + eventQuery.data.city}</span>
                        </div>
                        <div className="event-meta-item">
                            <span className="event-meta-icon" aria-hidden="true"><CalendarMonthOutlinedIcon/></span>
                            <span>{new Date(eventQuery.data.startDate).toLocaleDateString("de-DE", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</span>
                        </div>
                        <div className="event-meta-item">
                            <span className="event-meta-icon" aria-hidden="true"><AccessTimeIcon/></span>
                            <span>{new Date(eventQuery.data.startDate).toLocaleString("de-DE", {hour: "2-digit"})} bis {new Date(eventQuery.data.endDate).toLocaleString("de-DE", {hour: "2-digit"})}</span>
                        </div>
                    </div>
                </Card>

                <div className="event-content-grid">
                    <Card className="detail-card event-description-card" variant="outlined">
                        <h2>Über dieses Event</h2>
                        <div
                            className="event-rich-content"
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(eventQuery.data.content)}}
                        />
                    </Card>
                    <Card className="detail-card event-location-card" variant="outlined">
                        <h2>Standort</h2>
                        <MapLocation
                            latitude={Number(eventQuery.data.latitude)}
                            longitude={Number(eventQuery.data.longitude)}
                        />
                    </Card>
                </div>

                {(owner || admin) && (
                    <Card className="event-actions-card" variant="outlined">
                        <h2>Event Aktionen</h2>
                        <div className="event-actions">
                            <Button
                                className="app-button app-button-secondary event-edit-button"
                                icon={<EditOutlined/>}
                                onClick={editEvent}
                            >
                                Edit Event
                            </Button>
                            <Button
                                className="app-button app-button-danger"
                                danger
                                icon={<DeleteOutlined/>}
                                loading={loading}
                                onClick={mutation.mutate}
                            >
                                Delete
                            </Button>
                        </div>
                    </Card>
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
