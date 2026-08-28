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
        <article className="comment-item">
            <Card className="comment-card" variant="outlined">
                {!editState && (
                    <div
                        className="comment-body"
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
            <div className="comment-meta-row">
                <span>
                    geschrieben von <bdi>{comment.owner.userName}</bdi> am {date} um {time.split(":")[0] + ":" + time.split(":")[1]}
                </span>
                {(owner || admin) && (
                    <div className="comment-actions">
                        {!editState && (
                            <Button
                                aria-label="Kommentar bearbeiten"
                                className="comment-edit-button"
                                icon={<EditOutlined/>}
                                onClick={() => setEditState(true)}
                            />
                        )}
                        <Button
                            aria-label="Kommentar löschen"
                            className="comment-delete-button"
                            danger
                            icon={<DeleteOutlined/>}
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
