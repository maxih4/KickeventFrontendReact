import React from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import axios from "axios";
import AdminPanel from "../components/AdminPanel";
import Loading from "../components/Loading";
import {Card, Tag} from "antd";
import {useQuery} from "@tanstack/react-query";

const UserPanel = () => {
    const authUser = useAuthUser();
    const authHeader = useAuthHeader();
    const isAuthenticated = useIsAuthenticated();
    const admin = Boolean(isAuthenticated && authUser?.roles?.some((role) => role.name === "ADMIN"));
    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user/" + authUser.userId, {
                headers: {
                    "Authorization": authHeader
                }
            });
            return res.data;
        },
        keepPreviousData: true
    });

    const roles = userQuery.data?.roles || [];

    return (
        <div className="page-container user-panel-page">
            <div className="panel-layout">
                <Card className="user-card" variant="outlined">
                    <h1>Userpanel</h1>
                    <div className="user-card-divider"/>
                    <p className="user-card-copy">
                        Hello <strong><bdi>{authUser.userName}</bdi></strong> with ID: <strong>{authUser.userId}</strong>
                    </p>
                    <p className="role-label">Folgende Rollen besitzt du:</p>
                    {userQuery.isLoading ? (
                        <Loading/>
                    ) : (
                        <ul className="role-list" aria-label="Rollen">
                            {roles.map((role) => (
                                <li key={role.name}>
                                    <Tag className={role.name === "ADMIN" ? "role-admin" : "role-user"}>
                                        {role.name}
                                    </Tag>
                                </li>
                            ))}
                        </ul>
                    )}
                </Card>
                {admin && <AdminPanel/>}
            </div>
        </div>
    );
};

export default UserPanel;
