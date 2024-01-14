import React, {useState} from 'react'
import axios from "axios";

import Loading from "./Loading";
import {Alert, Button, Form, Input} from "antd";

import {useNavigate} from "react-router-dom";


const Login = () => {



    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading,setLoading] =useState(false)
    const [form] = Form.useForm()
    const navigate=useNavigate()

    const registerHandler = (values) => {
        setLoading(true)
        setSuccess(false)
        setError(false)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/register", JSON.stringify({userName: values.userName, password: values.password}), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setLoading(false)
            setSuccess(true)
            form.setFieldsValue({
                userName:"",
                password:""
            })
        }, (err) => {
            setErrorMessage(err.response.data)
            setLoading(false)
            setError(true)

        })
    }

    return (
        /*<div className="container main">
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

        </div>*/


    <>                <div className="container max-w-2xl">{error &&

        <Alert description={errorMessage} message="Fehler" type="error" showIcon/>}
        {success &&

            <Alert description={"Registrierung erfolgreich"} message="Erfolgreich" type="success" showIcon
            action={  <Button type="link" onClick={()=>navigate("/login")}>Zum Login</Button>}
            >

            </Alert>}</div>
        <Form className="bg-background-900 container rounded text-text pb-2 max-w-2xl"
              name="basic"
                form={form}
              initialValues={{
                  remember: true,
              }}
              labelCol={{xs:{span:6,offset:0}}}
              wrapperCol={{xs:{span:12}}}

              onFinish={registerHandler}
              onFinishFailed={() => {
              }}
              autoComplete="off"
        ><h1 className="text-center text-text"> Registrieren </h1>


            <Form.Item className={"m-2"}
                label={<div className="text-text">Username</div>}

                name="userName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}

                style={{color: "red"}}

            >
                <Input />
            </Form.Item>

            <Form.Item className={"m-2"}
                label={<div className="text-text">Password</div>}
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >

                <Input.Password />
            </Form.Item>


            <Form.Item

                className="flex flex-row justify-center" >
                {!loading && <button className="bg-none bg-inherit border-none p-0 outline-inherit" type="submit">
                    <div
                         className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-secondary-500 hover:bg-gradient-to-r hover:from-secondary-500 hover:to-secondary-500 text-text hover:ring-2 hover:ring-offset-2 hover:ring-secondary-400 transition-all ease-out duration-300 ml-1">
                        <div
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></div>
                        <div className="relative font-body">Registrieren</div>
                    </div>
                </button>

                }
                {loading && <Loading></Loading>}
            </Form.Item>
        </Form>

    </>

    )

}

export default Login
