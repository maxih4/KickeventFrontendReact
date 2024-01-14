import React, {useState} from 'react';
import axios from "axios";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import {Button, Space, Table, Tag, Tooltip, Form, Input, Alert, Spin} from "antd";
import {DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import {useQueryClient} from "@tanstack/react-query";


const AdminPanelTabel = (props) => {
    const authHeader = useAuthHeader()
    const authUser = useAuthUser()
    const [editingRow, setEditingRow] = useState(null)
    const [form] = Form.useForm()
    const [editState, setEditState] = useState(false)
    const [response, setResponse] = useState(false)
    const [error, setError] = useState("")
    const queryClient = useQueryClient()
    const [loading,setLoading] = useState(false)
    const [loadingId,setLoadingId] =useState(0)
    const enumRoles = ["ADMIN", "USER", "ADMIN,USER", "USER,ADMIN"]
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Username",
            dataIndex: "userName",
            key: "userName",
            render: (userName, user) => {
                if (editingRow === user.id) {
                    return <Form.Item name="userName"
                                      rules={[{
                                          required: true,
                                          message: "Please enter a username",
                                          max: 254
                                      }]}>
                        <Input/>
                    </Form.Item>
                } else {
                    return <>{userName}</>
                }
            }
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            render: (roles, user) => {
                if (editingRow === user.id) {
                    return <Form.Item name="roles"
                                      rules={[{
                                          required: true,
                                          message: "Please enter correct user roles",
                                          type: "enum",
                                          enum: enumRoles
                                      }]}
                    >
                        <Input/>
                    </Form.Item>
                } else {
                    return <>{roles.map((role) => (
                        <Tag color={role.name === "ADMIN" ? "blue" : "green"} key={role}>
                            {role.name}
                        </Tag>
                    ))}</>


                }
            }
        },
        {
            title: "Actions",
            key: "Actions",
            render: (_, user) => (
                <Space size="small">
                    {editState && user.id === editingRow ? <Tooltip title="save">
                            <Button htmlType="submit" type="primary" shape="circle" icon={loading ?<Spin/>:<SaveOutlined/>}
                                    onClick={onFinish}/>
                        </Tooltip>

                        : <Tooltip title="edit">
                            <Button type="primary" shape="circle" disabled={(user.userName === authUser().userName)} icon={<EditOutlined/>}
                                    onClick={() => {
                                        setResponse(false)
                                        setError("")
                                        setEditingRow(user.id);
                                        setEditState(true)
                                        form.setFieldsValue({
                                            userName: user.userName,
                                            roles: user.roles.map((role) => role.name).toString()
                                        });
                                    }}
                            />
                        </Tooltip>}

                    <Tooltip title="delete">
                        <Button danger type="primary" shape="circle" icon={loading && loadingId===user.id.toString() ?  <Spin/> :<DeleteOutlined/>}
                                disabled={(user.userName === authUser().userName)}
                                onClick={(e) => deleteUser(user,e)}
                                id={user.id.toString()}
                        />
                    </Tooltip>

                </Space>
            )
        }
    ]


    function deleteUser(user,event) {
        setLoading(true)
        setLoadingId(event.target.id)
        setResponse(false)
        setError("")
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/user/" + user.id, {
            headers: {
                "Authorization": authHeader()
            }
        }).then((res) => {
            setLoading(false)
            queryClient.invalidateQueries({queryKey:["users"]})
            //queryClient.setQueryData(["users"],(users)=>{return users.filter((oldUser)=>{
           //     return oldUser.id !== user.id
           // })})
        }, (err) => {
            setLoading(false)
            setError(err)
        })
    }


    function onFinish() {
        setLoading(true)

        form.validateFields().then((values) => {
            console.log(values)
            let roles;
            if (!values.roles.includes(",")) {
                roles = [{"name": values.roles, "id": values.roles === "USER" ? "2" : "1"}]
            } else {
                roles = values.roles.split(",").map((role) => {
                    return {"name": role, "id": role === "USER" ? "2" : "1"}
                })
            }

            axios.put(import.meta.env.VITE_BACKEND_URL + "/user/" + editingRow, {
                roles: roles,
                userName: values.userName
            }, {
                headers: {
                    "Authorization": authHeader()
                }
            }).then((res) => {
                //Todo Validate Inputs Form
                console.log(res)
                setResponse(true)
                setEditingRow(null);
                setEditState(false)
                setLoading(false)
                queryClient.invalidateQueries({queryKey:["users"]})
            }, (err) => {
                console.log(err)
                setLoading(false)
                setError(err.response.data)
                setEditingRow(null);
                setEditState(false)

            }).catch((errorInfo) => {
                console.log('errorInfo ...', errorInfo);
            });
        })

    }


    return (<>
            <div className="mb-3">
                {response && <Alert message="Success" type="success" showIcon/>}
                {error !== "" && <Alert message={error.toString()} type="error" showIcon/>}</div>
            <Form form={form}>


                <Table dataSource={props.user} columns={columns}>

                </Table>
            </Form></>
    );
};

export default AdminPanelTabel;