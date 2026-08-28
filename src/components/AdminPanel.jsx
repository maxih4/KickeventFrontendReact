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
        <Card
            className="min-h-0 shadow-md min-[901px]:min-h-[680px]"
            classNames={{body: "p-5 sm:p-[26px]"}}
            variant="outlined"
        >
            <h2 className="mb-5 mt-0 font-heading text-[27px] font-[650] leading-tight tracking-[-0.035em] text-slate-900 dark:text-text sm:text-[30px]">Adminpanel</h2>
            {usersQuery.isLoading ? <Loading/> : <AdminPanelTabel user={usersQuery.data}/>}
        </Card>
    );
};
export default AdminPanel;
