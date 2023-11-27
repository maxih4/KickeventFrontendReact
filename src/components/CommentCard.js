import React, {useState} from 'react';
import DOMPurify from 'dompurify'
import {useAuthUser} from "react-auth-kit";
import EditComment from "./EditComment";




function EventCard(props) {



    const sanitizedData = () =>(
      {
        __html: DOMPurify.sanitize(props.comment.content)
    })

    const date = new Date(props.comment.created).toLocaleDateString("de-DE")
    const time = new Date(props.comment.created).toLocaleTimeString()
    const authUser = useAuthUser()
    const [editState, setEditState] = useState(false)

    const owner = props.comment.owner.userName === authUser().userName

    const openEditFunction = () => {
        setEditState(true)
    }

    return (

        <>
            <div className="card rounded-5">
                <div className="card-body">
                    {!editState && <div className="card-text" dangerouslySetInnerHTML={sanitizedData()}/>}
                    {editState &&
                    <EditComment commentId={props.comment.id} html={DOMPurify.sanitize(props.comment.content)} setToggleRefresh={props.setToggleRefresh} setEditState={setEditState}></EditComment>
                    }




                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                geschrieben von {props.comment.owner.userName} am {date} um {time}</div>

                {owner&& !editState && <button onClick={openEditFunction}><i className="bi bi-pencil-square"></i></button>}


        </div>
            <br/>
        </>
    );
}

export default EventCard;