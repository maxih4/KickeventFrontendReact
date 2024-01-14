import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useAuthHeader} from "react-auth-kit";
import axios from "axios";
import DOMPurify from "dompurify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Spin} from "antd";


const CommentEdit = (props) => {
    const [html, setHtml] = useState(props.html);
    const authHeader = useAuthHeader()
    const queryClient = useQueryClient()
    const [loading,setLoading] = useState(false)

    function onChange(e) {
        setHtml(DOMPurify.sanitize(e.target.value));
    }

    //Array Copy und neues Element statt altem element


    const mutation = useMutation({
        mutationFn: () =>
            submitChanges(),
        onSuccess: (responseComment) => {
            console.log(responseComment)
            console.log(props)

            queryClient.setQueryData(["comments", props.children[1].toString()], (oldList)=>{
                return oldList.map((com)=>{
                    if(com.id === responseComment.id) return responseComment;
                    else return com
                })
            })
        },
        onSettled:()=> {
            setLoading(false)
            props.setEditState(prev => !prev)
        },
        onError:(error)=>console.log(error)


    })

    const submitChanges = async () => {
        setLoading(true)
       return axios.put(import.meta.env.VITE_BACKEND_URL + "/api/comment/" + props.commentId, {
            content: html
        }, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => res.data)


    }

    return (
        <>
            <Editor value={html} onChange={onChange}
                    ></Editor>
            <br/>
            <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={mutation.mutate}>
                <div
                    className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative font-body">{loading ? <Spin className="spin-black"></Spin> : <>Änderungen speichern</>}</span>
                </div>
            </button>
        </>
    );
};

export default CommentEdit;