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
        axios.post(process.env.REACT_BACKEND_URL+"/api/event/" + id + "/comment", {
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
                    containerProps={{style: {backgroundColor: "white"}}}></Editor>
            <br/>
            <button onClick={submitComment} className="rounded-5">

                Kommentar speichern
            </button>
        </>

    );
};

export default CommentInput;