import React, {useEffect, useState} from 'react'


import EventCard from "./EventCard";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HomeHeader from "./HomeHeader";


const Home = () => {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [eventsPerPage, setEventsPerPage] = useState(3)
    const [events, setEvents] = useState([])
    let events2 = []


    useEffect(() => {
        axios.get("https://localhost:8443/api/event",).then((res) => {
            const data = res.data.sort((a, b) => {
                if (a.createdDate > b.createdDate) {
                    return -1
                }
            })
            events2 = data
            setEvents(data)

            console.log("events:" + events)
            setTotalPages(Math.ceil(events2.length / eventsPerPage))

        }, (err) => {
            console.log(err)
        })


    }, []);

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
                <div className="text-white offset-lg-7 col-lg-5 col-12 text-center text-md-end"
                     style={{fontFamily: "Outfit", fontSize: "64px"}}>Aktuelle Events
                </div>
            </div>

            {
                currentEvents.map(event => (

                    <EventCard key={event.id} event={event}></EventCard>
                ))}


            <nav aria-label="Event page navigation" className="mt-5">
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
            </nav>

        </div>
    )
}


export default Home
