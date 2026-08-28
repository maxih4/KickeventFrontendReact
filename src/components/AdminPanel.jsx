import React from 'react';
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import AdminPanelTabel from "./AdminPanelTabel";
import Loading from "./Loading";
import {Card} from "antd";
import {useQuery} from "@tanstack/react-query";

const AdminPanel = () => {

    const authHeader = useAuthHeader()
    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user", {
                headers: {
                    "Authorization": authHeader
                }
            })
            return await res.data
        },
        keepPreviousData: true
    })
    return (
        <Card className="admin-panel-card" variant="outlined">
            <h2>Adminpanel</h2>
            {usersQuery.isLoading ? <Loading/> : <AdminPanelTabel user={usersQuery.data}/>}
        </Card>
    );
};
export default AdminPanel;
