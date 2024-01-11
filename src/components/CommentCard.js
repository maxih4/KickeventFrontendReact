import React, {useState} from 'react';
import DOMPurify from 'dompurify'
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import EditComment from "./EditComment";
import axios from "axios";
import {Card} from "antd";
import {DeleteOutlined, EditOutlined, LogoutOutlined} from "@ant-design/icons";
import editComment from "./EditComment";


function EventCard(props) {


    const sanitizedData = () => (
        {
            __html: DOMPurify.sanitize(props.comment.content)
        })

    const date = new Date(props.comment.created).toLocaleDateString("de-DE")
    const time = new Date(props.comment.created).toLocaleTimeString()
    const authUser = useAuthUser()
    const authHeader = useAuthHeader()
    const [editState, setEditState] = useState(false)
    const isAuthenticated = useIsAuthenticated()
    let owner = false
    let admin = false
    if (isAuthenticated()) {
        owner = props.comment.owner.userName === authUser().userName
        admin = authUser().roles.some((e) => e.name === "ADMIN")
    }


    const openEditFunction = () => {
        setEditState(true)
    }
    const deleteComment = () => {

        axios.delete(process.env.REACT_APP_BACKEND_URL + "/api/comment/" + props.comment.id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev => !prev)
        }, (err) => {

        })
    }

    return (

        <>
            {/* <div className="card rounded-5">
                <div className="card-body">
                    {!editState && <div className="card-text" dangerouslySetInnerHTML={sanitizedData()}/>}
                    {editState &&
                        <EditComment commentId={props.comment.id} html={DOMPurify.sanitize(props.comment.content)}
                                     setToggleRefresh={props.setToggleRefresh}
                                     setEditState={setEditState}></EditComment>
                    }


                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    geschrieben von {props.comment.owner.userName} am {date} um {time}</div>
                <div>
                    {(owner|| admin) && !editState &&
                        <button onClick={openEditFunction}><i className="bi bi-pencil-square"></i></button>}
                    {(owner||admin) && <button onClick={deleteComment}><i className="bi bi-trash"></i></button>}
                </div>

            </div>
            <br/>*/}
            <Card className="mb-1 bg-background-800 cursor-default" hoverable>
                {!editState &&<div className="text-text font-body" dangerouslySetInnerHTML={sanitizedData()}/>}
                {editState &&
                    <EditComment commentId={props.comment.id} html={DOMPurify.sanitize(props.comment.content)}
                                 setToggleRefresh={props.setToggleRefresh}
                                 setEditState={setEditState}></EditComment>
                }
            </Card>
            <div className="text-text font-body pb-2">
                <div className="md:flex md:flex-row md:justify-between grid-cols-2 grid">
                    <div className="text-sm md:text-base">geschrieben von {props.comment.owner.userName} am {date} um {time.split(":")[0] + ":" + time.split(":")[1]}</div>
                    <div className="justify-self-end">
                        {(owner || admin) && !editState &&
                            <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={openEditFunction}>
                                <div
                                    className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-secondary-500 hover:bg-gradient-to-r hover:from-secondary-500 hover:to-secondary-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-secondary-400 transition-all ease-out duration-300 ml-1">
                                    <div
                                        className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                                    <div className="relative font-body"><EditOutlined/> </div>
                                </div>
                            </button>}
                        {(owner || admin) &&
                            <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={deleteComment}>
                            <div
                                 className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-red-500 hover:bg-gradient-to-r hover:from-white-500 hover:to-white-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-white-400 transition-all ease-out duration-300 ml-1">
                                <div
                                    className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                                <div className="relative font-body"><DeleteOutlined/>

                                </div>
                            </div>
                            </button>}
                    </div>
                </div></div>
        </>
    );
}

export default EventCard;