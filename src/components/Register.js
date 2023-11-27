
import React from 'react'
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {Navigate, useNavigate} from 'react-router-dom'

import api from "../services/Api";


const Login = () => {
    const isAuthenticated = useIsAuthenticated()

    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({userName: "", password: ""})


    const registerHandler = (e) => {

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


            <form onSubmit={registerHandler} className="m-5">
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
