import React, {useState} from 'react'


import EventCard from "../components/EventCard";
import axios from "axios";
import HomeHeader from "../components/HomeHeader";
import FilterAndSearchBar from "../components/FilterAndSearchBar";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {Pagination} from "antd";
import {useQuery} from "@tanstack/react-query";
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
        <div className="page-container home-page">
            <HomeHeader/>
            <div className="home-section-header">
                <h2>Aktuelle Events</h2>
                <FilterAndSearchBar
                    setSort={setSort}
                    setSearch={setSearch}
                    search={search}
                />
            </div>
            {eventsQuery.isLoading && <Loading/>}
            {eventsQuery.data && (
                <div className="event-list">
                    {eventsQuery.data.content.map((event) => (
                        <EventCard key={event.id} event={event}/>
                    ))}
                </div>
            )}
            {!eventsQuery.isLoading && eventsQuery.data?.empty && <Error search={search}/>}
            <div className="pagination-wrap">
                {!eventsQuery.isLoading && eventsQuery.data && (
                    <Pagination
                        showSizeChanger
                        pageSizeOptions={[3, 5, 10, 20, 50]}
                        onShowSizeChange={onShowSizeChange}
                        current={page}
                        total={eventsQuery.data.totalElements}
                        pageSize={eventsPerPage}
                        onChange={(nextPage) => setPage(nextPage)}
                    />
                )}
            </div>
        </div>
    )
}

export default Home
