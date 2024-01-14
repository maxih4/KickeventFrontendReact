import React from 'react';
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";
import AdminPanelTabel from "./AdminPanelTabel";
import Loading from "./Loading";
import {useQuery} from "@tanstack/react-query";

const AdminPanel = () => {

    const authHeader = useAuthHeader()




    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user",{
                headers: {
                    "Authorization": authHeader()
                }
            })


            return await res.data
        },
        keepPreviousData:true
    })



    return (
        <div>
            <h2  className="font-heading">Adminpanel</h2>


              {usersQuery.isLoading ? <Loading></Loading>: <AdminPanelTabel user={usersQuery.data} ></AdminPanelTabel>
                }


        </div>
    );
};

export default AdminPanel;