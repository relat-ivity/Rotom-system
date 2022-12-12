import React from 'react'
import axios from 'axios'
import './Regi.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'

const Regi = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
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

                    <Form.Item
                        label="确认密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
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