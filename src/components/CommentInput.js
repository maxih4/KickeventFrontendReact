import React, {useState} from 'react';
import Editor from 'react-simple-wysiwyg'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import DOMPurify from "dompurify";

const CommentInput = (props) => {
    const [html, setHtml] = useState('');
    const {id} = useParams()
    const authHeader = useAuthHeader()

    function onChange(e) {
        setHtml(DOMPurify.sanitize(e.target.value))
    }

    function submitComment() {
        axios.post(process.env.REACT_APP_BACKEND_URL+"/api/event/" + id + "/comment", {
            content: html
        }, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev => !prev)
            setHtml("")
        }, (err) => {

        })
    }

    return (<>


            <Editor value={html} onChange={onChange}
                    containerProps={{className: "bg-white"}}></Editor>
            <br/>

            <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={submitComment}>
                <div
                    className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative font-body">Kommentar speichern</span>
                </div>
            </button>
        </>

    );
};

export default CommentInput;