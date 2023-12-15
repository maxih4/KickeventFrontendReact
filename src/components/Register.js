import React, {useState} from 'react'
import axios from "axios";
import SubmitButton from "./SubmitButton";


const Login = () => {

    const [formData, setFormData] = useState({userName: "", password: ""})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const registerHandler = (e) => {

        //Making Network Call to the backend
        e.preventDefault()
        setSuccess(false)
        setError(false)
        axios.post("https://localhost:8443/register", JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setSuccess(true)
            setFormData({userName: "", password: ""})
        }, (err) => {
            setErrorMessage(err.response.data)
            setError(true)

        })
    }

    return (

        <div className="container main">
            <br/>
            {success &&

                <div className="alert alert-success" role="alert">
                    Registrierung erfolgreich
                </div>}

            {error &&

                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}


            <form onSubmit={registerHandler} className="m-5 bg-light p-5 pt-2 pb-4 rounded-4">
                <h3 style={{fontFamily: "Outfit", fontSize: "55px"}} className="pb-2">Registrieren</h3>
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
                    <SubmitButton size={"44px"} class={"ms-5 me-5"} text={"Registrieren"}>

                    </SubmitButton>
                </div>
            </form>

        </div>
    )

}

export default Login
