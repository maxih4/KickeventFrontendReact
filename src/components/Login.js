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
import axios from "axios";
import React, {useState} from 'react'
import {useSignIn} from 'react-auth-kit'
import {useNavigate} from 'react-router-dom'
import SubmitButton from "./SubmitButton";


const Login = () => {

    const signIn = useSignIn()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({userName: "", password: ""})

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const loginHandler = (e) => {
        console.log("Backend URL: " + process.env.REACT_BACKEND_URL)
        setError(false)
        e.preventDefault()
        axios.post(process.env.REACT_BACKEND_URL+"/login", JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {

                if (signIn(
                    {
                        token: res.data.jwtToken,
                        expiresIn: Math.floor((new Date(res.data.expirationDate) - new Date()) / 1000 / 60),
                        tokenType: res.data.type,
                        refreshToken: res.data.refreshToken,
                        refreshTokenExpireIn: Math.floor((new Date(res.data.expirationDateRefreshToken) - new Date()) / 1000 / 60),
                        authState: {userName: formData.userName, userId: res.data.userId, roles: res.data.roles}
                    }
                )) {
                    //Login successfull

                    navigate('/user')
                } else {
                    alert("Error Occoured. Try Again")
                }
            }
        }, (err) => {
            if (err.response.status === 401) {
                setErrorMessage("Daten nicht bekannt")
            } else {
                setErrorMessage("Unbekannter Fehler")
            }

            setError(true)
            console.log(err)
        })


    }


    return (

        <div className="container main">
            <br/>

            {error &&

                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
            <form onSubmit={loginHandler} className="m-5 bg-light p-5 pt-2 pb-4 rounded-4">
                <h3 style={{fontFamily: "Outfit", fontSize: "45px"}} className="pb-2">Login</h3>
                <div className="form-group pb-3">
                    <label htmlFor="usernameInput" className="pb-3"
                           style={{fontFamily: "Poppins", fontSize: "24px"}}>Username</label>
                    <input
                        className="form-control"
                        id="usernameInput"
                        placeholder="username"
                        type={"userName"} onChange={(e) => setFormData({...formData, userName: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput" className="pb-3"
                           style={{fontFamily: "Poppins", fontSize: "24px"}}>Password</label>
                    <input
                        className="form-control"
                        id="passwordInput"
                        placeholder="password"
                        type={"password"} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <SubmitButton size={"20px"} class={"ms-md-5 me-md-5"} text={"Login"}>

                    </SubmitButton>
                </div>
            </form>
        </div>
    )

}

export default Login
