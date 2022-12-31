import React from 'react'
import axios from 'axios'
import './Login.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'
import Password from 'antd/es/input/Password';

const Login = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate("/main:"+values.username+":"+values.password)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='formbox'>
            <div className='loghead'>
                <img src="pic/lotomu.png" width={100}/> 
                <p>Rotom智能家居管理系统</p>
            </div>
            <Form className='logform'
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 16 }}>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                    <Button type="primary" htmlType="submit" >
                        登录
                    </Button>
                    <Button type="link" htmlType="button" onClick={() => {navigate('regi')}}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
            <div className='clear'></div>
        </div>
    )
}

export default Login;