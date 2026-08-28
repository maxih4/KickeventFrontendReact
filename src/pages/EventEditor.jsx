import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useNavigate} from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import DOMPurify from "dompurify";
import {Alert, Button, Card, DatePicker, Form, Input, TimePicker} from "antd";
import dayjs from "dayjs";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationSearch from "../components/LocationSearch";
import {useMutation, useQueryClient} from "@tanstack/react-query";

function getSubmitErrorMessage(error) {
    const responseData = error?.response?.data;
    const responseMessage = [
        typeof responseData === "string" ? responseData : null,
        responseData?.message,
        responseData?.detail
    ].find((message) => typeof message === "string" && message.trim());

    if (responseMessage) {
        const normalizedMessage = responseMessage.trim();

        if (normalizedMessage.includes("One or more fields are empty")) {
            return "Bitte fülle alle Pflichtfelder aus.";
        }

        return normalizedMessage;
    }

    return "Bitte prüfe deine Eingaben und versuche es erneut.";
}

const EventEditor = (props) => {
    const title = props.title;
    const [html, setHtml] = useState(props.html);
    const [street, setStreet] = useState(props.streetName);
    const [houseNumber, setHouseNumber] = useState(props.houseNumber);
    const [postalCode, setPostalCode] = useState(props.postalCode);
    const [city, setCity] = useState(props.city);
    const authHeader = useAuthHeader();
    const [startTime, setStartTime] = useState(props.startTime);
    const [endTime, setEndTime] = useState(props.endTime);
    const [long, setLong] = useState(props.long);
    const [lat, setLat] = useState(props.lat);
    const [date, setDate] = useState(props.date);
    const mode = props.mode;
    const eventId = props.eventId;
    const [dateEdited, setDateEdited] = useState(false);
    const [form] = Form.useForm();
    const addressLabel = props.streetName + " " + props.houseNumber + ", " + props.city + ", Deutschland";
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: () => submitChanges(),
        onSuccess: (event) => {
            queryClient.setQueryData(["event", event.id.toString()], event);
            if (mode === "update") {
                props.setEditState(prev => !prev);
            } else {
                navigate("/event/" + event.id);
            }
        },
        onError: (error) => console.log(error)
    });

    function onChangeHtml(e) {
        setHtml(DOMPurify.sanitize(e.target.value));
    }

    function dateSelect(dateValue, dateString) {
        setDate(dayjs(dateString, "DD-MM-YYYY"));
    }

    function timeSelect(time, timeString) {
        setStartTime(timeString[0]);
        setEndTime(timeString[1]);
        setDateEdited(true);
    }

    const disabledDate = (current) => current && current < new Date();

    async function submitChanges() {
        let startDate = "";
        let endDate = "";

        if (mode === undefined) {
            if (!(startTime === undefined) && !(endTime === undefined)) {
                startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ");
                endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ");
            }

            return axios.post(import.meta.env.VITE_BACKEND_URL + "/api/event", {
                content: html,
                title: form.getFieldValue("title"),
                startDate,
                endDate,
                streetName: street,
                houseNumber,
                postalCode,
                city,
                longitude: long,
                latitude: lat
            }, {
                headers: {
                    "Authorization": authHeader
                }
            }).then((res) => res.data);
        }

        if (!dateEdited) {
            startDate = date.set("hour", startTime.get("hour")).set("minute", startTime.get("minute")).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ");
            endDate = date.set("hour", endTime.get("hour")).set("minute", endTime.get("minute")).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ");
        } else {
            startDate = date.set("hour", startTime.split(":")[0]).set("minute", startTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ");
            endDate = date.set("hour", endTime.split(":")[0]).set("minute", endTime.split(":")[1]).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ");
        }

        return axios.put(import.meta.env.VITE_BACKEND_URL + "/api/event/" + eventId, {
            content: html,
            title: form.getFieldValue("title"),
            startDate,
            endDate,
            streetName: street,
            houseNumber,
            postalCode,
            city,
            longitude: long,
            latitude: lat
        }, {
            headers: {
                "Authorization": authHeader
            }
        }).then((res) => res.data);
    }

    const editorActionLabel = mode === "update" ? "Änderungen speichern" : "Event erstellen";
    const editorErrorTitle = mode === "update"
        ? "Änderungen konnten nicht gespeichert werden"
        : "Event konnte nicht erstellt werden";

    return (
        <div className="page-container editor-page">
            {mutation.isError && (
                <Alert
                    className="editor-alert"
                    description={getSubmitErrorMessage(mutation.error)}
                    showIcon
                    title={editorErrorTitle}
                    type="error"
                />
            )}
            <Form className="editor-form" form={form} initialValues={{title}} layout="vertical">
                <Card className="editor-card" variant="outlined">
                    <Form.Item className="editor-title-item" label="Titel" name="title">
                        <Input/>
                    </Form.Item>

                    <div className="editor-description">
                        <Editor className="rich-text-editor" value={html} onChange={onChangeHtml}/>
                    </div>

                    <div className="editor-details-grid">
                        <div className="editor-detail">
                            <label className="editor-field-label" htmlFor="event-location">
                                <span className="field-icon" aria-hidden="true"><LocationOnOutlinedIcon/></span>
                                Standort
                            </label>
                            <div className="editor-field-control">
                                <LocationSearch
                                    addressLabel={addressLabel}
                                    inputId="event-location"
                                    setCity={setCity}
                                    setHouseNumber={setHouseNumber}
                                    setLang={setLat}
                                    setLong={setLong}
                                    setPostalCode={setPostalCode}
                                    setStreet={setStreet}
                                />
                            </div>
                        </div>
                        <div className="editor-detail">
                            <label className="editor-field-label" htmlFor="event-date">
                                <span className="field-icon" aria-hidden="true"><CalendarMonthOutlinedIcon/></span>
                                Datum
                            </label>
                            <div className="editor-field-control">
                                <DatePicker
                                    defaultValue={date}
                                    disabledDate={disabledDate}
                                    format="DD-MM-YYYY"
                                    id="event-date"
                                    onChange={dateSelect}
                                />
                            </div>
                        </div>
                        <div className="editor-detail">
                            <label className="editor-field-label" htmlFor="event-time">
                                <span className="field-icon" aria-hidden="true"><AccessTimeIcon/></span>
                                Uhrzeit
                            </label>
                            <div className="editor-field-control">
                                <TimePicker.RangePicker
                                    defaultValue={[startTime, endTime]}
                                    format="HH:mm"
                                    id="event-time"
                                    minuteStep={30}
                                    onChange={timeSelect}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="editor-submit">
                    <Button
                        className="app-button app-button-primary editor-submit-button"
                        loading={mutation.isPending}
                        onClick={() => {
                            mutation.reset();
                            mutation.mutate();
                        }}
                    >
                        {editorActionLabel}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default EventEditor;
