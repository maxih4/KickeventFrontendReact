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
import React from 'react'
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {Navigate, useNavigate} from 'react-router-dom'
import api from "../services/Api";


const Login = () => {
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({userName: "", password: ""})

    /**
     * Login Handle, the callback function onClick from the "Login" button
     *
     * This function demostrate a dummy authentication, using useSignIn function
     */


    /*axios.interceptors.request.use(x => {
            console.log(x);
            return x
        }
    )*/
    const loginHandler = (e) => {

        //Making Network Call to the backend
        e.preventDefault()
        api.post("https://localhost:8443/login", JSON.stringify(formData), {
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
                        authState: {userName: formData.userName}
                    }
                )) {
                    //Login successfull

                    navigate('/secure')
                } else {
                    alert("Error Occoured. Try Again")
                }
            }
        }, (err) =>

            console.log(err))


    }
    console.log(isAuthenticated())
    if (isAuthenticated()) {
        // If authenticated user, then redirect to secure dashboard

        return (
            <Navigate to={'/secure'} replace/>
        )
    } else {
        // If not authenticated, use the login flow
        // For Demostration, I'm using just a button to login.
        // In reality, there should be a form, validation, nwetowrk request and other things
        return (


            <form onSubmit={loginHandler} className="m-5">
                <h3>Login</h3>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input
                        className="form-control"
                        id="usernameInput"
                        placeholder="username"
                        type={"userName"} onChange={(e) => setFormData({...formData, userName: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        className="form-control"
                        id="passwordInput"
                        placeholder="password"
                        type={"password"} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Log in</button>

            </form>
        )
    }
}

export default Login
