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
        <div className="mx-auto flex min-h-[calc(100dvh-118px)] w-[calc(100%-1.5rem)] max-w-[1232px] flex-col items-center justify-center gap-4 py-7 pb-[42px] sm:min-h-[calc(100dvh-130px)] sm:w-[calc(100%-2rem)] sm:py-14 sm:pb-[72px]">
            {error && (
                <Alert className="w-full max-w-[520px]" description={errorMessage} title="Fehler" showIcon type="error"/>
            )}
            <Card
                className="w-full max-w-[520px] shadow-lg"
                classNames={{body: "p-7 pb-[30px] sm:px-[42px] sm:pb-[38px]"}}
                variant="outlined"
            >
                <h1 className="m-0 mb-7 text-center font-heading text-[30px] font-[650] leading-[1.1] tracking-[-0.045em] text-slate-900 dark:text-text sm:text-[34px]">Login</h1>
                <Form
                    autoComplete="on"
                    className="[&_.ant-form-item]:mb-[18px] [&_.ant-form-item-explain-error]:text-red-600 [&_.ant-form-item-label]:pb-1.5 [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:text-slate-900 dark:[&_.ant-form-item-explain-error]:text-red-400 dark:[&_.ant-form-item-label>label]:text-text"
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
                        <Input autoComplete="username" className="!min-h-11 !rounded-[9px]"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Bitte Passwort eingeben.'}]}
                    >
                        <Input.Password autoComplete="current-password" className="!min-h-11 !rounded-[9px]"/>
                    </Form.Item>
                    <Button
                        className="!mt-2 !h-11 !w-full !rounded-[9px] !font-[650]"
                        htmlType="submit"
                        loading={loading}
                        type="primary"
                    >
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
