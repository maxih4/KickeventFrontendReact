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
        <div className="mx-auto flex min-h-[calc(100dvh-118px)] w-[calc(100%-1.5rem)] max-w-[1232px] flex-col items-center justify-center gap-4 py-7 pb-[42px] sm:min-h-[calc(100dvh-130px)] sm:w-[calc(100%-2rem)] sm:py-14 sm:pb-[72px]">
            {error && (
                <Alert className="w-full max-w-[520px]" description={errorMessage} title="Fehler" showIcon type="error"/>
            )}
            {success && (
                <Alert
                    action={<Button className="!text-secondary-600 hover:!text-secondary-500 dark:!text-secondary-300 dark:hover:!text-secondary-200" type="link" onClick={() => navigate("/login")}>Zum Login</Button>}
                    className="w-full max-w-[520px]"
                    description="Registrierung erfolgreich"
                    title="Erfolgreich"
                    showIcon
                    type="success"
                />
            )}
            <Card
                className="w-full max-w-[520px] shadow-lg"
                classNames={{body: "p-7 pb-[30px] sm:px-[42px] sm:pb-[38px]"}}
                variant="outlined"
            >
                <h1 className="m-0 mb-7 text-center font-heading text-[30px] font-[650] leading-[1.1] tracking-[-0.045em] text-slate-900 dark:text-text sm:text-[34px]">Registrieren</h1>
                <Form
                    autoComplete="on"
                    className="[&_.ant-form-item]:mb-[18px] [&_.ant-form-item-explain-error]:text-red-600 [&_.ant-form-item-label]:pb-1.5 [&_.ant-form-item-label>label]:font-semibold [&_.ant-form-item-label>label]:text-slate-900 dark:[&_.ant-form-item-explain-error]:text-red-400 dark:[&_.ant-form-item-label>label]:text-text"
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
                        <Input autoComplete="username" className="!min-h-11 !rounded-[9px]"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Bitte Passwort eingeben.'}]}
                    >
                        <Input.Password autoComplete="new-password" className="!min-h-11 !rounded-[9px]"/>
                    </Form.Item>
                    <Button
                        className="!mt-2 !h-11 !w-full !rounded-[9px] !font-[650]"
                        htmlType="submit"
                        loading={loading}
                        type="primary"
                    >
                        Registrieren
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
