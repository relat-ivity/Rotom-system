import React from 'react'
import axios from 'axios'
import './Regi.css'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'

const Regi = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values) => {
        axios.get('http://localhost:8000/regin' ,{
              params: {
                username: values.username,
                password: values.password,
                phonenumber: values.phonenumber,
              }
              
            }).then((response)=>{
              const code=response.data.status;
              console.log(code);
              if(code=="1"){
                alert("注册成功")
              }
              else{
                alert('用户名已存在')
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
        <div>
            <div className='formbox'>
                <div className='loghead'>
                    <img src="pic/lotomu.png" width={100} />
                    <p>Rotom智能家居管理系统</p>
                </div>
                <Form className='regiform'
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }, 
                                    { type: 'string', min: 6, message: '用户名至少6位' },  
                                    { type: 'string', max: 16, message: '用户名最多16位' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }, 
                                    { type: 'string', min: 6, message: '密码至少6位' },
                                    { type: 'string', max: 16, message: '密码最多16位' },]}
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

                    <Form.Item
                        label="手机号"
                        name="phonenumber"
                        rules={[{ required: true, message: '请输入手机号!' }, {
                            required: false,
                            pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                            message: '请输入正确的手机号'
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            注册
                        </Button>
                        <Button type="link" htmlType="button" onClick={() => { navigate('/login') }}>
                            已拥有账号
                        </Button>
                    </Form.Item>
                </Form>
                <div className='clear'></div>
            </div>
        </div>
    )
}

export default Regi;