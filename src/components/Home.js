import React, {useEffect, useState} from 'react'


import EventCard from "./EventCard";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HomeHeader from "./HomeHeader";
import FilterAndSearchBar from "./FilterAndSearchBar";
import EventsPerPage from "./EventsPerPage";


const Home = () => {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [eventsPerPage, setEventsPerPage] = useState(3)
    const [events, setEvents] = useState([])
    const [sort,setSort] = useState("")
    const [search, setSearch] =useState("")
    let events2 = []


    useEffect(() => {
        axios.get("https://localhost:8443/api/event",{params: {sort: sort,search: search.toLowerCase()}}).then((res) => {
            const data = res.data
            events2 = data
            setEvents(data)

            console.log("events:" + events)
            setTotalPages(Math.ceil(events2.length / eventsPerPage))

        }, (err) => {
            console.log(err)
        })


    }, [sort,search]);

    const startIndex = currentPage * eventsPerPage
    const endIndex = startIndex + eventsPerPage
    const currentEvents = events.slice(startIndex, endIndex)

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
    }

    return (
        <div className="container main">
            <HomeHeader/>
            <div className="row pb-4 pt-5">
                <div className="d-flex flex-column justify-content-center col-12 col-md-4"><FilterAndSearchBar setSort={setSort} setSearch={setSearch} search={search}></FilterAndSearchBar></div>
                <div className="text-white text-center text-md-end col-12 col-md-8"
                     style={{fontFamily: "Outfit", fontSize: "64px"}}>Aktuelle Events
                </div>
            </div>

            {
                currentEvents.map(event => (

                    <EventCard key={event.id} event={event} button={true}></EventCard>
                ))}


            <nav aria-label="Event page navigation" className="mt-5">
                <div className="d-flex flex-row justify-content-between">
                <EventsPerPage eventsPerPage={eventsPerPage} setEventsPerPage={setEventsPerPage} events={events} setTotalPages={setTotalPages}></EventsPerPage>
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
            </nav>

        </div>
    )
}


export default Home
