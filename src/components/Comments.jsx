import React from 'react';
import {useParams} from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import axios from "axios";
import {Card} from "antd";
import {useQuery} from "@tanstack/react-query";
import Loading from "./Loading";

const Comments = () => {
    const {id} = useParams();
    const isAuthenticated = useIsAuthenticated();
    const commentQuery = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id + "/comment");
            return res.data;
        },
        keepPreviousData: true
    });

    return (
        <section aria-labelledby="comments-title">
            <Card className="comments-card" variant="outlined">
                <h2 id="comments-title">Kommentare</h2>
                {commentQuery.isLoading ? (
                    <Loading/>
                ) : (
                    <div className="comments-list">
                        {commentQuery.data.map((comment) => (
                            <CommentCard key={comment.id} comment={comment}/>
                        ))}
                    </div>
                )}
            </Card>
            <Card className="comment-form-card" variant="outlined">
                {isAuthenticated ? (
                    <CommentInput/>
                ) : (
                    <p className="comment-login-prompt">Bitte loggen Sie sich ein, um das Event zu kommentieren.</p>
                )}
            </Card>
        </section>
    );
};

export default Comments;
