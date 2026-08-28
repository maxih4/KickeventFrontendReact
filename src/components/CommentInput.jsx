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
            <div className="comment-form-editor">
                <Editor className="rich-text-editor comment-editor" value={html} onChange={onChange}/>
            </div>
            <div className="comment-form-submit">
                <Button loading={isLoading} onClick={mutation.mutate}>
                    Kommentar speichern
                </Button>
            </div>
        </div>

    );
};

export default CommentInput;
