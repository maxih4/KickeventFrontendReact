import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Form, Input} from "antd";

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const registerHandler = (values) => {
        setLoading(true);
        setSuccess(false);
        setError(false);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/register", JSON.stringify({
            userName: values.userName,
            password: values.password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setLoading(false);
            setSuccess(true);
            form.setFieldsValue({
                userName: "",
                password: ""
            });
        }, (err) => {
            setErrorMessage(err.response.data);
            setLoading(false);
            setError(true);
        });
    };

    return (
        <div className="page-container auth-page">
            {error && (
                <Alert className="auth-alert" description={errorMessage} title="Fehler" showIcon type="error"/>
            )}
            {success && (
                <Alert
                    action={<Button className="app-button-link" type="link" onClick={() => navigate("/login")}>Zum Login</Button>}
                    className="auth-alert"
                    description="Registrierung erfolgreich"
                    title="Erfolgreich"
                    showIcon
                    type="success"
                />
            )}
            <Card className="auth-card" variant="outlined">
                <h1>Registrieren</h1>
                <Form
                    autoComplete="on"
                    className="auth-form"
                    form={form}
                    initialValues={{remember: true}}
                    layout="vertical"
                    name="register"
                    onFinish={registerHandler}
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
                        <Input.Password autoComplete="new-password"/>
                    </Form.Item>
                    <Button
                        className="app-button app-button-primary auth-submit"
                        htmlType="submit"
                        loading={loading}
                    >
                        Registrieren
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
