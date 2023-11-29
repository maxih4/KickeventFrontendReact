import React from 'react';
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import {HtmlEditor} from "react-simple-wysiwyg";
import HTMLEllipsis from "react-lines-ellipsis/lib/html.modern.mjs";
import LinesEllipsis from "react-lines-ellipsis";




function EventCard(props) {
    const handleReflow=(e)=>{
    return e.clamped
}

    return (

        <>

            <div className="card">
                <div className="row g-0 row-cols-1">

                    <div className="text-center col-2 rounded"
                         style={{backgroundColor: "#77BB41", backgroundSize: "cover", color:"white"}}>
                        <br/>
                        <br/>
                        <h2 style={{fontFamily: "Judson", fontSize: "80px"}}>{new Date(props.event.startDate).toLocaleString("de-De",{day: "numeric"})}</h2>
                        <br/>
                        <h2 style={{fontFamily: "Kameron", fontWeight:"bold", fontSize:"81px"}}>{new Date(props.event.startDate).toLocaleString("de-De", {month: "short"})}</h2>

                    </div>


                    <div className="card-body col-10" >
                        <h5 className="card-title">{props.event.title}</h5>


                        <HTMLEllipsis
                            unsafeHTML={DOMPurify.sanitize(props.event.content)}
                            maxLine='6'

                            basedOn='letters'
                        />



                        <Link to={"/event/" + props.event.id} className="btn btn-primary">Go to Event with
                            id: {props.event.id}</Link>
                    </div>
                </div>
            </div>

            <br/>
        </>
    );
}

export default EventCard;