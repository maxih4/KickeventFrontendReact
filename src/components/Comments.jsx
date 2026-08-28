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
            <Card
                className="mt-4"
                classNames={{body: "p-[22px_24px] max-[640px]:p-5"}}
                variant="outlined"
            >
                <h2 className="m-0 font-heading text-lg font-[650] leading-tight tracking-[-0.035em] text-slate-900 dark:text-text" id="comments-title">Kommentare</h2>
                {commentQuery.isLoading ? (
                    <Loading/>
                ) : (
                    <div className="flex flex-col gap-2.5 pt-4">
                        {commentQuery.data.map((comment) => (
                            <CommentCard key={comment.id} comment={comment}/>
                        ))}
                    </div>
                )}
            </Card>
            <Card
                className="mt-4"
                classNames={{body: "p-[22px_24px] max-[640px]:p-5"}}
                variant="outlined"
            >
                {isAuthenticated ? (
                    <CommentInput/>
                ) : (
                    <p className="m-0 text-center text-slate-600 dark:text-text-300">Bitte loggen Sie sich ein, um das Event zu kommentieren.</p>
                )}
            </Card>
        </section>
    );
};

export default Comments;
