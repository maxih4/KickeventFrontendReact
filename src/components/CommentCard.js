import React, {useState} from 'react';
import DOMPurify from 'dompurify'
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import EditComment from "./EditComment";
import axios from "axios";


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
    let admin=false
    if (isAuthenticated()) {
        owner = props.comment.owner.userName === authUser().userName
        admin = authUser().roles.some((e)=>e.name==="ADMIN")
    }


    const openEditFunction = () => {
        setEditState(true)
    }
    const deleteComment = () => {

        axios.delete(process.env.REACT_APP_BACKEND_URL+"/api/comment/" + props.comment.id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev=>!prev)
        }, (err) => {

        })
    }

    return (

        <>
            <div className="card rounded-5">
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
            <br/>
        </>
    );
}

export default EventCard;