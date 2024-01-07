import React from 'react';
import axios from "axios";
import {useAuthHeader, useAuthUser} from "react-auth-kit";

const AdminPanelUser = (props) => {
    const authHeader=useAuthHeader()
    const authUser = useAuthUser()
    function deleteUser(){
        axios.delete(process.env.REACT_BACKEND_URL+"/user/" + props.user.id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev=>!prev)
        }, (err) => {

        })
    }



    return (
        <div className="row">
            <span className="col">id: {props.user.id} </span> <span className="col">name: {props.user.userName}</span>
            <span className="col">{!(props.user.userName===authUser().userName) &&<button onClick={deleteUser}><i className="bi bi-trash"></i></button>}</span>

        </div>
    );
};

export default AdminPanelUser;