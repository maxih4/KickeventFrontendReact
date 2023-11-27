import React, {useEffect, useState} from 'react'

import api from "../services/Api";
import EventCard from "./EventCard";
import ReactPaginate from "react-paginate";



const Home = () => {


    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [eventsPerPage, setEventsPerPage] = useState(3)
    const [events, setEvents] = useState([])
    let events2 = []


    useEffect(() => {
        api.get("https://localhost:8443/api/event",).then((res) => {

            events2 = res.data
            setEvents(res.data)

            console.log("events:" + events)
            setTotalPages(Math.ceil(events2.length / eventsPerPage))

        }, (err) => {
            console.log(err)
        })


    },[]);

    const startIndex = currentPage * eventsPerPage
    const endIndex = startIndex + eventsPerPage
    const currentEvents = events.slice(startIndex, endIndex)

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
    }

    return (
        <div className="container">
            <h3 className="float-md-end">Aktuelle Events</h3><br/><br/>


            {
                currentEvents.map(event => (

                <EventCard key={event.id} event={event}></EventCard>
            ))}


                <nav aria-label="Event page navigation">
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
                                   activeClassName="active"

                    />
                </nav>

        </div>
    )
}


export default Home
