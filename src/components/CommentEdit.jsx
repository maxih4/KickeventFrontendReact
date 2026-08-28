import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import DOMPurify from "dompurify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button} from "antd";


const CommentEdit = (props) => {
    const [html, setHtml] = useState(props.html);
    const authHeader = useAuthHeader()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    function onChange(e) {
        setHtml(DOMPurify.sanitize(e.target.value));
    }

    const mutation = useMutation({
        mutationFn: () =>
            submitChanges(),
        onSuccess: (responseComment) => {
            queryClient.setQueryData(["comments", props.eventId.toString()], (oldList) => {
                return oldList.map((com) => {
                    if (com.id === responseComment.id) return responseComment;
                    else return com
                })
            })
        },
        onSettled: () => {
            setLoading(false)
            props.setEditState(prev => !prev)
        },
        onError: (error) => console.log(error)
    })

    const submitChanges = async () => {
        setLoading(true)
        return axios.put(import.meta.env.VITE_BACKEND_URL + "/api/comment/" + props.commentId, {
            content: html
        }, {
            headers: {
                "Authorization": authHeader
            }
        }).then((res) => res.data)
    }

    return (
        <>
            <Editor className="rich-text-editor comment-editor" value={html} onChange={onChange}/>
            <div className="comment-edit-submit">
                <Button className="app-button app-button-primary" loading={loading} onClick={mutation.mutate}>
                    Änderungen speichern
                </Button>
            </div>
        </>
    );
};

export default CommentEdit;
