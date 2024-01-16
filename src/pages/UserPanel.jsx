import React from 'react'
import {useAuthHeader, useAuthUser, useIsAuthenticated} from 'react-auth-kit'
import axios from "axios";
import AdminPanel from "../components/AdminPanel";
import Loading from "../components/Loading";
import {useQuery} from "@tanstack/react-query";


const UserPanel = () => {

    const authUser = useAuthUser()
    const authHeader = useAuthHeader();
    const isAuthenticated = useIsAuthenticated()
    let admin = false
    if (isAuthenticated()) {
        admin = authUser().roles.some((e) => e.name === "ADMIN")
    }
    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user/" + authUser().userId, {
                headers: {
                    "Authorization": authHeader()
                }
            })
            return await res.data
        },
        keepPreviousData: true
    })

    return (
        <div className="container p-4 mt-5 rounded-4 text-text font-body">
            <h1 className="font-heading">Userpanel</h1>
            <p>{`Hello ${authUser().userName}`} with ID: {authUser().userId}</p>
            <p>Folgende Rollen besitzt du:</p>
            <br/>
            {userQuery.isLoading && <Loading></Loading>}
            <ul>
                {!userQuery.isLoading && userQuery.data.roles.map((role) => {
                    return <li key={role}>{role.name} </li>
                })}
            </ul>
            {admin && <AdminPanel></AdminPanel>}
        </div>
    )
}

export default UserPanel
