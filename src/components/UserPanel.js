import React, {useEffect, useState} from 'react'
import {useAuthHeader, useAuthUser, useIsAuthenticated} from 'react-auth-kit'
import axios from "axios";
import AdminPanel from "./AdminPanel";


const UserPanel = () => {

    const authUser = useAuthUser()
    const authHeader = useAuthHeader();
    const [userInfo, setUserInfo] = useState({id: 0, userName: "", roles: []})
    const isAuthenticated = useIsAuthenticated()
    let admin = false
    if (isAuthenticated()) {
        admin = authUser().roles.some((e) => e.name === "ADMIN")
    }


    useEffect(() => {
        axios.get("https://localhost:8443/user/" + authUser().userId, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            setUserInfo(res.data)

        }, (err) => {
            console.log(err)
        })

    }, []);

    return (
        <div className="container bg-light p-4 mt-5 rounded-4 main">
            <p>{`Hello ${authUser().userName}`} with ID: {authUser().userId}</p>
            <p>Folgende Rollen besitzt du:</p>
            <br/>
            <ul>
                {userInfo.roles.map((role) => {
                    return <li key={role}>{role.name} </li>
                })}

            </ul>


            {admin && <AdminPanel></AdminPanel>}
        </div>
    )
}

export default UserPanel
