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
        <div className="mx-auto w-[calc(100%-1.5rem)] max-w-[1232px] pb-10 pt-5 sm:w-[calc(100%-2rem)] sm:pb-[60px] sm:pt-[30px]">
            {mutation.isError && (
                <Alert
                    className="mb-4"
                    description={getSubmitErrorMessage(mutation.error)}
                    showIcon
                    title={editorErrorTitle}
                    type="error"
                />
            )}
            <Form
                className="[&_.ant-form-item-label]:pb-1.5 [&_.ant-form-item-label>label]:font-[650] [&_.ant-form-item-label>label]:text-slate-900 dark:[&_.ant-form-item-label>label]:text-text"
                form={form}
                initialValues={{title}}
                layout="vertical"
            >
                <Card
                    className="shadow-lg"
                    classNames={{body: "p-5 sm:p-6"}}
                    variant="outlined"
                >
                    <Form.Item className="mb-0 border-b border-slate-200 pb-[18px] dark:border-background-800" label="Titel" name="title">
                        <Input className="!min-h-11 !rounded-[9px]"/>
                    </Form.Item>

                    <div className="py-5 pb-[22px]">
                        <Editor
                            className="!overflow-hidden !rounded-[10px] !border-slate-300 !bg-white !text-slate-900 dark:!border-background-600 dark:!bg-background-950 dark:!text-text [&_.rsw-toolbar]:min-h-11 [&_.rsw-toolbar]:border-slate-200 [&_.rsw-toolbar]:bg-slate-100 [&_.rsw-btn]:text-slate-600 [&_.rsw-btn:hover]:bg-slate-200 [&_.rsw-btn:hover]:text-slate-900 [&_.rsw-ce]:min-h-[238px] [&_.rsw-ce]:p-4 [&_.rsw-ce]:font-body [&_.rsw-ce]:text-sm [&_.rsw-ce]:leading-[1.55] dark:[&_.rsw-toolbar]:border-background-600 dark:[&_.rsw-toolbar]:bg-background-900 dark:[&_.rsw-btn]:text-text-300 dark:[&_.rsw-btn:hover]:bg-background-800 dark:[&_.rsw-btn:hover]:text-text dark:[&_.rsw-ce]:text-text"
                            value={html}
                            onChange={onChangeHtml}
                        />
                    </div>

                    <div className="-mx-5 grid grid-cols-1 border-t border-slate-200 dark:border-background-800 sm:-mx-6 sm:grid-cols-[minmax(0,1.45fr)_minmax(200px,.75fr)_minmax(240px,.9fr)]">
                        <div className="min-w-0 px-4 pb-5 pt-5 sm:px-[22px] sm:pb-0">
                            <label className="flex items-center gap-2 font-[650] text-slate-900 dark:text-text" htmlFor="event-location">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><LocationOnOutlinedIcon fontSize="inherit"/></span>
                                Standort
                            </label>
                            <div className="pt-3">
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
                        <div className="min-w-0 border-t border-slate-200 px-4 pb-5 pt-5 dark:border-background-800 sm:border-s sm:border-t-0 sm:px-[22px] sm:pb-0">
                            <label className="flex items-center gap-2 font-[650] text-slate-900 dark:text-text" htmlFor="event-date">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><CalendarMonthOutlinedIcon fontSize="inherit"/></span>
                                Datum
                            </label>
                            <div className="pt-3">
                                <DatePicker
                                    className="!min-h-11 !w-full !rounded-[9px]"
                                    defaultValue={date}
                                    disabledDate={disabledDate}
                                    format="DD-MM-YYYY"
                                    id="event-date"
                                    onChange={dateSelect}
                                />
                            </div>
                        </div>
                        <div className="min-w-0 border-t border-slate-200 px-4 pb-5 pt-5 dark:border-background-800 sm:border-s sm:border-t-0 sm:px-[22px] sm:pb-0">
                            <label className="flex items-center gap-2 font-[650] text-slate-900 dark:text-text" htmlFor="event-time">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-50 text-primary-700 dark:bg-background-700 dark:text-primary-400" aria-hidden="true"><AccessTimeIcon fontSize="inherit"/></span>
                                Uhrzeit
                            </label>
                            <div className="pt-3">
                                <TimePicker.RangePicker
                                    className="!min-h-11 !w-full !rounded-[9px]"
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

                <div className="flex justify-center pt-6">
                    <Button
                        className="!min-h-[42px] !min-w-[190px] !rounded-[9px] !font-[650]"
                        loading={mutation.isPending}
                        onClick={() => {
                            mutation.reset();
                            mutation.mutate();
                        }}
                        type="primary"
                    >
                        {editorActionLabel}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default EventEditor;
