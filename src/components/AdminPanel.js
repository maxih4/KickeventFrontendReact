import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import AdminPanelUser from "./AdminPanelUser";
import Loading from "./Loading";

const AdminPanel = () => {
    const [user, setUser] = useState([])
    const authHeader = useAuthHeader()
    const [toggleRefresh,setToggleRefresh] = useState(false)
    const [loading,setLoading] =useState(true)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/user/",{
            headers:{
                "Authorization" : authHeader()
            }
        }).then((res)=>{
            setLoading(false)
            setUser(res.data)

        },(err)=>{
            setLoading(true)
            console.log(err)
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[toggleRefresh]);

    return (
        <div>
            <h4>Adminpanel</h4>


              {loading ? <Loading></Loading>: <AdminPanelUser user={user} setToggleRefresh={setToggleRefresh}></AdminPanelUser>
                }


        </div>
    );
};

export default AdminPanel;