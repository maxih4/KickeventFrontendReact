import React, {useState} from 'react'
import axios from "axios";
import SubmitButton from "./SubmitButton";
import Loading from "./Loading";


const Login = () => {


    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading,setLoading] =useState(false)


    const registerHandler = (e) => {
        setLoading(true)
        e.preventDefault()
        setSuccess(false)
        setError(false)
        axios.post(process.env.REACT_APP_BACKEND_URL+"/register", JSON.stringify({username: username, password: password}), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setLoading(false)
            setSuccess(true)
            setUsername("")
            setPassword("")
        }, (err) => {
            setErrorMessage(err.response.data)
            setLoading(false)
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
                <h3 style={{fontFamily: "Outfit", fontSize: "35px"}} className="pb-2">Registrieren</h3>
                <div className="form-group pb-3">
                    <label htmlFor="usernameInput" className="pb-3"
                           style={{fontFamily: "Poppins", fontSize: "24px"}}>Username</label>
                    <input
                        className="form-control"
                        id="usernameInput"
                        placeholder="username"
                        value={username}
                        type={"userName"} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput" className="pb-3"
                           style={{fontFamily: "Poppins", fontSize: "24px"}}>Password</label>
                    <input
                        className="form-control"
                        id="passwordInput"
                        placeholder="password"
                        value={password}
                        type={"password"} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="d-flex flex-row justify-content-end">

                    {!loading &&                     <SubmitButton size={"20px"} class={"ms-md-5 me-md-5"} text={"Registrieren"}>

                    </SubmitButton>}
                    {loading && <Loading></Loading>}
                </div>
            </form>

        </div>
    )

}

export default Login
