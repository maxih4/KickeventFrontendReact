import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import {useIsAuthenticated} from "react-auth-kit";
import axios from "axios";


const Comments = (eventId) => {

    const {id} = useParams()
    const [comment, setComment] = useState([])
    const [toggleRefresh, setToggleRefresh] = useState(false)
    const isAuthenticated = useIsAuthenticated()


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/api/event/" + id + "/comment",).then((res) => {
            setComment(res.data)

        }, (err) => {
            console.log(err)
        })
    }, [toggleRefresh,id]);

    return (
        <>
            <div>
                {comment.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment} setToggleRefresh={setToggleRefresh}></CommentCard>
                })}
            </div>
            {isAuthenticated() &&
                <CommentInput setToggleRefresh={setToggleRefresh}></CommentInput>
            }
            {!isAuthenticated() && <p className={"pt-2 mt-1 fs-3 text-center"} >Bitte loggen Sie sich ein um das Event zu kommentieren</p>}
        </>
    );
};

export default Comments