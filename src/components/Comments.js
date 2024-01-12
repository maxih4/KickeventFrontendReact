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
            <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                <h3 className="text-text font-heading pl-1 pr-1">Kommentare</h3>
                <div className="m-3">{comment.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment}
                                        setToggleRefresh={setToggleRefresh}></CommentCard>
                })}</div>
            </div>

            <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
            {isAuthenticated() &&
                <CommentInput setToggleRefresh={setToggleRefresh}></CommentInput>
            }
            {!isAuthenticated() &&
                <h3 className="pt-2 mt-1 font-body text-text text-center mt-3">Bitte loggen Sie sich ein um das Event zu kommentieren</h3>}

            </div>
            </>
    );
};

export default Comments