import React, {useState} from 'react'


import EventCard from "../components/EventCard";
import axios from "axios";
import HomeHeader from "../components/HomeHeader";
import FilterAndSearchBar from "../components/FilterAndSearchBar";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {Divider, Pagination} from "antd";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import qs from "qs"


const Home = () => {

    const [page, setPage] = useState(1)
    const [eventsPerPage, setEventsPerPage] = useState(3)
    const [sort, setSort] = useState("")
    const [search, setSearch] = useState("")



    const eventsQuery = useQuery({
        queryKey: ["events", page, eventsPerPage,sort,search],
        queryFn: async () => {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/event", {
                params: {
                    sort: sort,
                    search: search.toLowerCase(),
                    page: page-1,
                    size: eventsPerPage
                },
                paramsSerializer: params => qs.stringify(params, { encode: false }),
            })
            return await res.data
        },
        keepPreviousData:true,

    })









    const onShowSizeChange = (current, pageSize) => {
        setEventsPerPage(pageSize)
    };




    return (
        <div className="container">
            <HomeHeader/>
            <Divider className="bg-primary-100 w-full mt-5 m-0 opacity-50" orientationMargin=""/>
            <div className="pb-4 pt-5">
                <div className="flex md:flex-row flex-col justify-between "><FilterAndSearchBar
                    setSort={setSort} setSearch={setSearch}
                    search={search}></FilterAndSearchBar>
                    <div
                        className="text-text text-center md:text-end font-heading text-4xl order-first md:order-last pb-4 md:pb-0">Aktuelle
                        Events
                    </div>
                </div>
            </div>
            {eventsQuery.isLoading &&
                <Loading></Loading>


            }


            {eventsQuery.data && eventsQuery.data.content.map((e) => (
            <EventCard key={e.id} event={e} button={true}></EventCard>
            ))}
            {!eventsQuery.isLoading &&eventsQuery.data.empty && <Error search={search}></Error>
            }


            <div className="flex flex-row justify-center">
                {!eventsQuery.isLoading && <Pagination showSizeChanger pageSizeOptions={[3, 5, 10, 20, 50]}
                                                       onShowSizeChange={onShowSizeChange} current={page} total={eventsQuery.data.totalElements}
                                                       defaultPageSize={eventsPerPage} onChange={(page)=>{setPage(page)
                                                       console.log(page)}}/>}
            </div>

        </div>
    )
}


export default Home
