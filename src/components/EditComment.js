import React, {useState} from 'react';
import Editor from "react-simple-wysiwyg";
import {useAuthHeader} from "react-auth-kit";
import axios from "axios";
import DOMPurify from "dompurify";


const EditComment = (props) => {
    const [html, setHtml] = useState(props.html);
    const authHeader = useAuthHeader()

    function onChange(e) {
        setHtml(DOMPurify.sanitize(e.target.value));
    }

    const submitChanges = () => {
        axios.put(process.env.REACT_APP_BACKEND_URL+"api/comment/" + props.commentId, {
            content: html
        }, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev=>!prev)
            props.setEditState(prev => !prev)
        }, (err) => {

        })

    }

    return (
        <>
            <Editor value={html} onChange={onChange}
                    containerProps={{style: {backgroundColor: "white"}}}></Editor>
            <br/>
            <button onClick={submitChanges} className="rounded-5">

                Änderungen speichern
            </button>
        </>
    );
};

export default EditComment;