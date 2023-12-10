import React from 'react';
import axios from "axios";
import {useAuthHeader, useAuthUser} from "react-auth-kit";

const AdminPanelUser = (props) => {
    const authHeader=useAuthHeader()
    const authUser = useAuthUser()
    function deleteUser(){
        axios.delete("https://localhost:8443/user/" + props.user.id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            props.setToggleRefresh(prev=>!prev)
        }, (err) => {

        })
    }



    return (
        <div>
            id: {props.user.id} - name: {props.user.userName}
            {!(props.user.userName===authUser().userName) &&<button onClick={deleteUser}><i className="bi bi-trash"></i></button>}

        </div>
    );
};

export default AdminPanelUser;