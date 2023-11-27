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
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {Navigate, useNavigate} from 'react-router-dom'


const Login = () => {
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({userName: "", password: ""})

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
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

        setError(false)
        e.preventDefault()
        axios.post("https://localhost:8443/login", JSON.stringify(formData), {
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
                        authState: {userName: formData.userName, userId: res.data.userId}
                    }
                )) {
                    //Login successfull

                    navigate('/user')
                } else {
                    alert("Error Occoured. Try Again")
                }
            }
        }, (err) => {
            if(err.response.status===401){
                setErrorMessage("Daten nicht bekannt")
            }else{
                setErrorMessage("Unbekannter Fehler")
            }

            setError(true)
            console.log(err)
        })


    }

    if (isAuthenticated()) {
        // If authenticated user, then redirect to secure dashboard

        return (
            <Navigate to={'/user'} replace/>
        )
    } else {
        // If not authenticated, use the login flow
        // For Demostration, I'm using just a button to login.
        // In reality, there should be a form, validation, nwetowrk request and other things
        return (

            <div className="container">
                <br/>

                {error &&

                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>}
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
            </div>
        )
    }
}

export default Login
