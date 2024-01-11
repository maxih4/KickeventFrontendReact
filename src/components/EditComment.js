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

        axios.put(process.env.REACT_APP_BACKEND_URL + "/api/comment/" + props.commentId, {
            content: html
        }, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev => !prev)
            props.setEditState(prev => !prev)

        }, (err) => {
            console.log(err)
        })


    }

    return (
        <>
            <Editor value={html} onChange={onChange}
                    ></Editor>
            <br/>
            <button className="bg-none bg-inherit border-none p-0 outline-inherit" onClick={submitChanges}>
                <div
                    className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative font-body">Änderungen speichern</span>
                </div>
            </button>
        </>
    );
};

export default EditComment;