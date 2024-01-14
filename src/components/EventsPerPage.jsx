import React from 'react';

function EventsPerPage({eventsPerPage, setEventsPerPage, setTotalPages, events}) {

    const options = [3, 5, 10, 20, 50]

    const page = "Ergebnisse pro Seite: " + eventsPerPage

    function handleChange(option) {
        setEventsPerPage(option)
        setTotalPages(Math.ceil(events.length / option))
    }

    return (
        <div className="me-4">
            {/*            <DropdownButton id="dropdown-basic-button " title={page} className={"button"}>

                {options.map((option) => {
                    if (option !== eventsPerPage) {
                        return <Dropdown.Item key={option} onClick={() => {
                            handleChange(option)
                        }}>{option}</Dropdown.Item>
                    } else {
                        return <></>
                    }
                })}


            </DropdownButton>*/}</div>

    );
}

export default EventsPerPage;