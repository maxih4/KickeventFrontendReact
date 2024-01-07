import React, {useEffect, useState} from 'react'
import {useAuthHeader, useAuthUser, useIsAuthenticated} from 'react-auth-kit'
import axios from "axios";
import AdminPanel from "./AdminPanel";
import Loading from "./Loading";


const UserPanel = () => {

    const authUser = useAuthUser()
    const authHeader = useAuthHeader();
    const [userInfo, setUserInfo] = useState({id: 0, userName: "", roles: []})
    const isAuthenticated = useIsAuthenticated()
    let admin = false
    if (isAuthenticated()) {
        admin = authUser().roles.some((e) => e.name === "ADMIN")
    }
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/user/" + authUser().userId, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            setLoading(false)
            setUserInfo(res.data)

        }, (err) => {
            setLoading(false)
            console.log(err)
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container bg-light p-4 mt-5 rounded-4 main">
            <p>{`Hello ${authUser().userName}`} with ID: {authUser().userId}</p>
            <p>Folgende Rollen besitzt du:</p>
            <br/>
            {loading&&<Loading></Loading>}
            <ul>
                {!loading&&userInfo.roles.map((role) => {
                    return <li key={role}>{role.name} </li>
                })}


            </ul>


            {admin && <AdminPanel></AdminPanel>}
        </div>
    )
}

export default UserPanel
