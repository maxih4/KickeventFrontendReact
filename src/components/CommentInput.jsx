import React, {useState} from 'react';
import Editor from 'react-simple-wysiwyg'
import {useParams} from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import DOMPurify from "dompurify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button} from "antd";

const CommentInput = () => {
    const [html, setHtml] = useState('');
    const {id} = useParams()
    const authHeader = useAuthHeader()
    const queryClient = useQueryClient()
    const [isLoading,setIsLoading] = useState(false)
    function onChange(e) {
        setHtml(DOMPurify.sanitize(e.target.value))
    }
    const mutation = useMutation({
        mutationFn:()=>
            submitComment()
        ,
        onSuccess:(comment)=>{
            queryClient.setQueryData(["comments", id], (old)=>[...old,comment])
        },
        onSettled:()=>setIsLoading(false),
        onError:(error)=>console.log(error)
    })

    async function submitComment() {
        setIsLoading(true)
        return axios.post(import.meta.env.VITE_BACKEND_URL + "/api/event/" + id + "/comment", {
            content: html
        }, {
            headers: {
                "Authorization": authHeader
            }
        }).then((res) => {
            setHtml("")
            return res.data
        })
    }

    return (
        <div>
            <div className="pt-4">
                <Editor
                    className="!overflow-hidden !rounded-[10px] !border-slate-300 !bg-white !text-slate-900 dark:!border-background-600 dark:!bg-background-950 dark:!text-text [&_.rsw-toolbar]:min-h-11 [&_.rsw-toolbar]:border-slate-200 [&_.rsw-toolbar]:bg-slate-100 [&_.rsw-btn]:text-slate-600 [&_.rsw-btn:hover]:bg-slate-200 [&_.rsw-btn:hover]:text-slate-900 [&_.rsw-ce]:min-h-[140px] [&_.rsw-ce]:p-4 [&_.rsw-ce]:font-body [&_.rsw-ce]:text-sm [&_.rsw-ce]:leading-[1.55] dark:[&_.rsw-toolbar]:border-background-600 dark:[&_.rsw-toolbar]:bg-background-900 dark:[&_.rsw-btn]:text-text-300 dark:[&_.rsw-btn:hover]:bg-background-800 dark:[&_.rsw-btn:hover]:text-text dark:[&_.rsw-ce]:text-text"
                    value={html}
                    onChange={onChange}
                />
            </div>
            <div className="flex justify-end pt-3">
                <Button className="!min-h-10 !rounded-[9px] !font-[650]" loading={isLoading} onClick={mutation.mutate} type="primary">
                    Kommentar speichern
                </Button>
            </div>
        </div>

    );
};

export default CommentInput;
