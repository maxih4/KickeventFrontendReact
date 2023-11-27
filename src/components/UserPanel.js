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

import EventCard from "./EventCard";
import axios from "axios";

const UserPanel = () => {

    const authUser = useAuthUser()
    const authHeader = useAuthHeader();
    const [userInfo,setUserInfo] = useState({id:0,userName:"",roles:[]})



    useEffect(() => {
        axios.get("https://localhost:8443/user/"+authUser().userId,{
            headers:{
                "Authorization" : authHeader()
            }
        }).then((res)=>{
                setUserInfo(res.data)
        },(err)=>{
        console.log(err)
        })

    }, []);

    return (
        <div className="container">
            <p>{`Hello ${authUser().userName}`} with ID: {authUser().userId}</p>
            <p>Folgende Rollen besitzt du:
                <br/>

                {userInfo.roles.map((role)=>{
                return <>{role.name}</>
            })}</p>
        </div>
    )
}

export default UserPanel
