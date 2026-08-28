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
            <Editor
                className="!overflow-hidden !rounded-[10px] !border-slate-300 !bg-white !text-slate-900 dark:!border-background-600 dark:!bg-background-950 dark:!text-text [&_.rsw-toolbar]:min-h-11 [&_.rsw-toolbar]:border-slate-200 [&_.rsw-toolbar]:bg-slate-100 [&_.rsw-btn]:text-slate-600 [&_.rsw-btn:hover]:bg-slate-200 [&_.rsw-btn:hover]:text-slate-900 [&_.rsw-ce]:min-h-[140px] [&_.rsw-ce]:p-4 [&_.rsw-ce]:font-body [&_.rsw-ce]:text-sm [&_.rsw-ce]:leading-[1.55] dark:[&_.rsw-toolbar]:border-background-600 dark:[&_.rsw-toolbar]:bg-background-900 dark:[&_.rsw-btn]:text-text-300 dark:[&_.rsw-btn:hover]:bg-background-800 dark:[&_.rsw-btn:hover]:text-text dark:[&_.rsw-ce]:text-text"
                value={html}
                onChange={onChange}
            />
            <div className="flex justify-end pt-3">
                <Button className="!min-h-10 !rounded-[9px] !font-[650]" loading={loading} onClick={mutation.mutate} type="primary">
                    Änderungen speichern
                </Button>
            </div>
        </>
    );
};

export default CommentEdit;
