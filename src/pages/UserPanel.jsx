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
        <div className="mx-auto w-[calc(100%-1.5rem)] max-w-[1232px] pb-10 pt-5 sm:w-[calc(100%-2rem)] sm:pb-[60px] sm:pt-[30px]">
            <div className="grid items-start gap-[22px] min-[901px]:grid-cols-[minmax(250px,320px)_minmax(0,1fr)]">
                <Card
                    className="shadow-md"
                    classNames={{body: "p-5 sm:p-[26px]"}}
                    variant="outlined"
                >
                    <h1 className="m-0 font-heading text-[27px] font-[650] leading-tight tracking-[-0.035em] text-slate-900 dark:text-text sm:text-[30px]">Userpanel</h1>
                    <div className="my-5 border-t border-slate-200 dark:border-background-600"/>
                    <p className="m-0 text-base text-slate-600 dark:text-text-300">
                        Hello <strong><bdi>{authUser.userName}</bdi></strong> with ID: <strong>{authUser.userId}</strong>
                    </p>
                    <p className="mb-2 mt-[22px] text-sm text-slate-600 dark:text-text-300">Folgende Rollen besitzt du:</p>
                    {userQuery.isLoading ? (
                        <Loading/>
                    ) : (
                        <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Rollen">
                            {roles.map((role) => (
                                <li key={role.name}>
                                    <Tag className={role.name === "ADMIN"
                                        ? "m-0 rounded-full border-secondary-300 bg-secondary-50 font-[650] text-secondary-700 dark:border-secondary-700 dark:bg-secondary-950 dark:text-secondary-300"
                                        : "m-0 rounded-full border-primary-200 bg-primary-50 font-[650] text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300"}>
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
