import React from 'react';
import {useNavigate, Link} from "react-router-dom";




function EventCard(props) {



    return (

<>
        <div className="card">
            <div className="card-header">
                Event
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.event.title}</h5>
                <p className="card-text">{props.event.content}</p>


                <Link to={"/event/" + props.event.id} className="btn btn-primary">Go to Event with
                    id: {props.event.id}</Link>
            </div>
        </div>
        <br/>
</>
    );
}

export default EventCard;