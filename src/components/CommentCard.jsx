import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import CommentEdit from "./CommentEdit";
import axios from "axios";
import {Button, Card} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useMutation, useQueryClient} from "@tanstack/react-query";

function CommentCard({comment}) {
    const authUser = useAuthUser();
    const authHeader = useAuthHeader();
    const [editState, setEditState] = useState(false);
    const isAuthenticated = useIsAuthenticated();
    const [loading, setLoading] = useState(false);
    const query = useQueryClient();
    const date = new Date(comment.created).toLocaleDateString("de-DE");
    const time = new Date(comment.created).toLocaleTimeString();
    const owner = Boolean(isAuthenticated && authUser && comment.owner.userName === authUser.userName);
    const admin = Boolean(isAuthenticated && authUser?.roles?.some((role) => role.name === "ADMIN"));

    const mutation = useMutation({
        mutationFn: () => deleteComment(),
        onSuccess: () => query.setQueryData(["comments", comment.event.id.toString()], (oldComments) => {
            return oldComments.filter((oldComment) => oldComment.id !== comment.id);
        }),
        onSettled: () => setLoading(false),
        onError: (err) => {
            setLoading(false);
            console.log(err);
        }
    });

    const deleteComment = async () => {
        setLoading(true);
        return axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/comment/" + comment.id, {
            headers: {
                "Authorization": authHeader
            }
        }).then((res) => res.data);
    };

    return (
        <article>
            <Card
                className="rounded-[10px] bg-slate-50 shadow-none dark:bg-background-950"
                classNames={{body: "p-4"}}
                variant="outlined"
            >
                {!editState && (
                    <div
                        className="break-words text-slate-900 dark:text-text"
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment.content)}}
                    />
                )}
                {editState && (
                    <CommentEdit
                        commentId={comment.id}
                        eventId={comment.event.id}
                        html={DOMPurify.sanitize(comment.content)}
                        setEditState={setEditState}
                    />
                )}
            </Card>
            <div className="flex flex-col items-start justify-between gap-4 pt-2.5 text-xs text-slate-500 dark:text-text-400 sm:flex-row sm:items-center">
                <span>
                    geschrieben von <bdi>{comment.owner.userName}</bdi> am {date} um {time.split(":")[0] + ":" + time.split(":")[1]}
                </span>
                {(owner || admin) && (
                    <div className="flex gap-2 self-end sm:self-auto">
                        {!editState && (
                            <Button
                                aria-label="Kommentar bearbeiten"
                                className="!h-8 !min-w-8 !rounded-lg !border-secondary-500 !bg-secondary-500 !p-0 !text-white hover:!border-secondary-400 hover:!bg-secondary-400"
                                icon={<EditOutlined fontSize="small"/>}
                                onClick={() => setEditState(true)}
                            />
                        )}
                        <Button
                            aria-label="Kommentar löschen"
                            className="!h-8 !min-w-8 !rounded-lg !border-red-500 !bg-red-500 !p-0 !text-white hover:!border-red-400 hover:!bg-red-400"
                            danger
                            icon={<DeleteOutlined fontSize="small"/>}
                            loading={loading}
                            onClick={mutation.mutate}
                        />
                    </div>
                )}
            </div>
        </article>
    );
}

export default CommentCard;
