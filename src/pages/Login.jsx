import axios from "axios";
import React, {useState} from 'react'
import {useSignIn} from 'react-auth-kit'
import {useNavigate} from 'react-router-dom'
import Loading from "../components/Loading";
import {Alert, Form, Input} from "antd";

const Login = () => {

    const signIn = useSignIn()
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const loginHandler = (values) => {
        setLoading(true)
        setError(false)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/login", JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setLoading(false)
            if (res.status === 200) {
                if (signIn(
                    {
                        token: res.data.jwtToken,
                        expiresIn: Math.floor((new Date(res.data.expirationDate) - new Date()) / 1000 / 60),
                        tokenType: res.data.type,
                        refreshToken: res.data.refreshToken,
                        refreshTokenExpireIn: Math.floor((new Date(res.data.expirationDateRefreshToken) - new Date()) / 1000 / 60),
                        authState: {userName: values.userName, userId: res.data.userId, roles: res.data.roles}
                    }
                )) {
                    navigate('/user')
                } else {
                    alert("Error Occoured. Try Again")
                }
            }
        }, (err) => {
            setLoading(false)
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
        <>                {error &&
            <div className="container max-w-2xl"><Alert description={errorMessage} message="Fehler" type="error" showIcon/></div> }
            <Form className="bg-background-900 container rounded text-text pb-2 max-w-2xl"
                  name="basic"
                  initialValues={{
                      remember: true,
                  }}
                  labelCol={{xs:{span:6,offset:0}}}
                  wrapperCol={{xs:{span:12}}}
                  onFinish={loginHandler}
                  autoComplete="off"
            ><h1 className="text-center text-text"> Login </h1>
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
                             className="select-none cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-primary-400 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 text-text-900 hover:ring-2 hover:ring-offset-2 hover:ring-primary-400 transition-all ease-out duration-300 mr-1">
                        <span
                            className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-background opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative font-body">Login</span>
                        </div>
                    </button>}
                    {loading && <Loading></Loading>}
                </Form.Item>
            </Form>
        </>
    )
}

export default Login
