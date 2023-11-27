/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useEffect, useState} from 'react'
import {useAuthHeader, useAuthUser, useSignOut} from 'react-auth-kit'
import api from "../services/Api";
import EventCard from "./EventCard";

const SecureComponent = () => {
    const signOut = useSignOut()
    const authUser = useAuthUser()
    const authHeader = useAuthHeader();
    const [events,setEvents] = useState([])


    useEffect(() => {
        api.get("https://localhost:8443/api/event",{
            headers:{
                "Authorization" : authHeader()
            }
        }).then((res)=>{
                setEvents(res.data)
        },(err)=>{
        console.log(err)
        })

    }, []);

    return (
        <div>
            <p>{`Hello ${authUser().userName}`}</p>
            <button onClick={() => signOut()}>Sign Out!</button>
            {events.map(event=>(
                //<h2 key={event.id}>{event.title}<br/><p>{event.content}</p></h2>
                <EventCard key={event.id} event={event}></EventCard>
            ))}
        </div>
    )
}

export default SecureComponent
