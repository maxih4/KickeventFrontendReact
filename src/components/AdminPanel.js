import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import AdminPanelUser from "./AdminPanelUser";

const AdminPanel = () => {
    const [user, setUser] = useState([])
    const authHeader = useAuthHeader()
    const [toggleRefresh,setToggleRefresh] = useState(false)

    useEffect(() => {
        axios.get("https://localhost:8443/user/",{
            headers:{
                "Authorization" : authHeader()
            }
        }).then((res)=>{
            setUser(res.data)

        },(err)=>{
            console.log(err)
        })

    },[toggleRefresh]);

    return (
        <div>
            <h2>Adminpanel</h2>


                {user.map((user) => {
                    return <AdminPanelUser user={user} setToggleRefresh={setToggleRefresh}></AdminPanelUser>
                })}


        </div>
    );
};

export default AdminPanel;