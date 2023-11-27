import React, {useState} from 'react'
import axios from "axios";





const Login = () => {

    const [formData, setFormData] = useState({userName: "", password: ""})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

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
            setFormData({userName:"",password:""})
        }, (err) => {
            setErrorMessage(err.response.data)
            setError(true)

        })
    }

    return (

        <div className="container">
            <br/>
            {success &&

                <div className="alert alert-success" role="alert">
                    Registrierung erfolgreich
                </div>}

            {error &&

                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}


            <form onSubmit={registerHandler} className="m-5">
                <h3>Registrieren</h3>
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
                <button type="submit" className="btn btn-primary mt-2">Registrieren</button>

            </form>

        </div>
    )

}

export default Login
