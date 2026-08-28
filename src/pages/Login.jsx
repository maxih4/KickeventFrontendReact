import axios from "axios";
import React, {useState} from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, Card, Form, Input} from "antd";
import {toAuthKitRefreshToken} from "../services/refreshApi";

const Login = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHandler = (values) => {
        setLoading(true);
        setError(false);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/login", JSON.stringify(values), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                if (signIn({
                    auth: {
                        token: res.data.jwtToken,
                        type: res.data.type
                    },
                    refresh: toAuthKitRefreshToken(res.data.refreshToken, res.data.expirationDateRefreshToken),
                    userState: {userName: values.userName, userId: res.data.userId, roles: res.data.roles}
                })) {
                    navigate('/user');
                } else {
                    alert("Error Occoured. Try Again");
                }
            }
        }, (err) => {
            setLoading(false);
            if (err.response.status === 401) {
                setErrorMessage("Daten nicht bekannt");
            } else {
                setErrorMessage("Unbekannter Fehler");
            }
            setError(true);
            console.log(err);
        });
    };

    return (
        <div className="page-container auth-page">
            {error && (
                <Alert className="auth-alert" description={errorMessage} title="Fehler" showIcon type="error"/>
            )}
            <Card className="auth-card" variant="outlined">
                <h1>Login</h1>
                <Form
                    autoComplete="on"
                    className="auth-form"
                    initialValues={{remember: true}}
                    layout="vertical"
                    name="login"
                    onFinish={loginHandler}
                >
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[{required: true, message: 'Bitte Username eingeben.'}]}
                    >
                        <Input autoComplete="username"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Bitte Passwort eingeben.'}]}
                    >
                        <Input.Password autoComplete="current-password"/>
                    </Form.Item>
                    <Button
                        className="auth-submit auth-submit-primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
