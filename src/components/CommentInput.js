import React, {useState} from 'react';
import Editor from 'react-simple-wysiwyg'
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";

const CommentInput = (props) => {
    const [html, setHtml] = useState('my <b>HTML</b>');
    const {id} = useParams()
    const authHeader=useAuthHeader()

    function onChange(e) {
        setHtml(e.target.value);
    }

    function submitComment(){
        axios.post("https://localhost:8443/api/event/" + id +"/comment",{
            content: html
        },{
            headers:{
                "Authorization" : authHeader()
            }
        }).then((res)=>{
            props.setToggleRefresh(prev => !prev)
        },(err)=>{

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