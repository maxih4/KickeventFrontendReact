import React from 'react';
import {useParams} from "react-router-dom";

import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import {useIsAuthenticated} from "react-auth-kit";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Loading from "./Loading";


const Comments = (eventId) => {

    const {id} = useParams()
    const isAuthenticated = useIsAuthenticated()
    const commentQuery = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id + "/comment")
            return await res.data
        },
        keepPreviousData: true
    })
    return (
        <>
            <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                <h3 className="text-text font-heading pl-1 pr-1">Kommentare</h3>
                <div className="m-3">{commentQuery.isLoading ? <Loading/> : commentQuery.data.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment}></CommentCard>
                })}</div>
            </div>
            <div className="container bg-primary-900 rounded-xl pl-1 pr-1 pt-0.5 pb-2 mt-4">
                {isAuthenticated() &&
                    <CommentInput></CommentInput>}
                {!isAuthenticated() &&
                    <h3 className="pt-2 mt-1 font-body text-text text-center mt-3">Bitte loggen Sie sich ein, um das
                        Event zu kommentieren</h3>}
            </div>
        </>
    );
};

export default Comments