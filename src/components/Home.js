import React, {useEffect, useState} from 'react'


import EventCard from "./EventCard";
import axios from "axios";
import HomeHeader from "./HomeHeader";
import FilterAndSearchBar from "./FilterAndSearchBar";
import Error from "./Error";
import Loading from "./Loading";
import {Divider, Pagination} from "antd";


const Home = () => {


    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage, setEventsPerPage] = useState(5)
    const [events, setEvents] = useState([])
    const [sort, setSort] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/api/event", {
            params: {
                sort: sort,
                search: search.toLowerCase()
            }
        }).then((res) => {
            setLoading(false)
            setEvents(res.data)
        }, (err) => {
            setLoading(false)
            console.log(err)
        })

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, search]);

    const startIndex = (currentPage - 1) * eventsPerPage
    const endIndex = startIndex + eventsPerPage
    const currentEvents = events.slice(startIndex, endIndex)

    const handlePageChange = (selectedPage) => {
        console.log(selectedPage)
        setCurrentPage(selectedPage)
    }
    const onShowSizeChange = (current, pageSize) => {
        setEventsPerPage(pageSize)
        console.log(current, pageSize);
    };

    return (
        <div className="container">
            <HomeHeader/>
            <Divider className="bg-primary-100 w-full mt-5 m-0 opacity-50" orientationMargin=""/>
            <div className="pb-4 pt-5">
                <div className="flex md:flex-row flex-col justify-between "><FilterAndSearchBar
                    setLoading={setLoading} setSort={setSort} setSearch={setSearch}
                    search={search}></FilterAndSearchBar>
                    <div
                        className="text-text text-center md:text-end font-heading text-4xl order-first md:order-last pb-4 md:pb-0">Aktuelle
                        Events
                    </div>
                </div>
            </div>
            {loading &&
                <Loading></Loading>


            }
            {!loading &&
                currentEvents.map(event => (

                    <EventCard key={event.id} event={event} button={true}></EventCard>
                ))}
            {currentEvents.length < 1 && search.length > 0 && <Error></Error>}

            {/*
            <nav aria-label="Event page navigation" className="mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <EventsPerPage eventsPerPage={eventsPerPage} setEventsPerPage={setEventsPerPage} events={events}
                                   setTotalPages={setTotalPages}></EventsPerPage>
                    <ReactPaginate pageCount={totalPages}
                                   onPageChange={handlePageChange}
                                   forcePage={currentPage}
                                   previousLabel={"<<"}
                                   nextLabel={">>"}
                                   breakClassName="page-item"
                                   breakLinkClassName="page-link"
                                   containerClassName="pagination justify-content-center"
                                   pageClassName="page-item"
                                   pageLinkClassName="page-link"
                                   previousClassName="page-item"
                                   previousLinkClassName="page-link"
                                   nextClassName="page-item"
                                   nextLinkClassName="page-link"
                                   activeClassName="active color-pagination"

                    />
                    <div></div>
                </div>
            </nav>*/}
            <div className="flex flex-row justify-center">
                <Pagination showSizeChanger pageSizeOptions={[3, 5, 10, 20, 50]}
                            onShowSizeChange={onShowSizeChange} current={currentPage} total={events.length}
                            defaultPageSize={eventsPerPage} onChange={(page) => handlePageChange(page)}/>;
            </div>

        </div>
    )
}


export default Home
