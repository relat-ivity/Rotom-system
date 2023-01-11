import React from 'react'
import axios from 'axios'
import './ChangePSD.css'
import { base_url } from '../../../index'
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom'

const ChangePSD = () => {
    const navigate = useNavigate()
    const params = useParams()
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.get(base_url+'/updatepsd' ,{
              params: {
                username: params.id,
                password: values.password_now,
                new_password: values.password
              }
            }).then((response)=>{
              const code=response.data.status;
              if(code=="1"){
                alert("修改成功")
              }
              else{
                alert('密码错误')
              }
            }).catch(function (error){
                console.log(error);
              }
            )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='page'>
            <h1 className='pagetitle'><UserOutlined /> 修改密码</h1>
            <Form className='changeform'
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="当前密码"
                        name="password_now"
                        rules={[{ required: true, message: '请输入密码!' }, { type: 'string', min: 6, message: '密码至少6位' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }, { type: 'string', min: 6, message: '密码至少6位' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="password_again"
                        rules={[{ required: true, message: '请输入密码!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一致'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            修改
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}

export default ChangePSD;