import React, {useEffect, useState} from 'react';
import api from "../services/Api";
import {useParams} from "react-router-dom";

import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import {useIsAuthenticated} from "react-auth-kit";


const Comments = (eventId) => {

    const {id} = useParams()
    const [comment, setComment] = useState([])
    const [toggleRefresh, setToggleRefresh] = useState(false)
    const isAuthenticated = useIsAuthenticated()


    useEffect(() => {
        api.get("https://localhost:8443/api/event/" + id + "/comment",).then((res) => {
            setComment(res.data)

        }, (err) => {
            console.log(err)
        })
    }, [toggleRefresh]);

    return (
        <>
            <div>
                {comment.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment}></CommentCard>
                })}
            </div>
            {isAuthenticated() &&
                <CommentInput setToggleRefresh={setToggleRefresh}></CommentInput>
            }
        </>
    );
};

export default Comments