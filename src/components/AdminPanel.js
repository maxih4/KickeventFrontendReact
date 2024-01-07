import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import AdminPanelUser from "./AdminPanelUser";

const AdminPanel = () => {
    const [user, setUser] = useState([])
    const authHeader = useAuthHeader()
    const [toggleRefresh,setToggleRefresh] = useState(false)

    useEffect(() => {
        axios.get(process.env.REACT_BACKEND_URL+"/user/",{
            headers:{
                "Authorization" : authHeader()
            }
        }).then((res)=>{
            setUser(res.data)

        },(err)=>{
            console.log(err)
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
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