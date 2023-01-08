import React from 'react'
import axios from 'axios'
import './ChangePhone.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'

const ChangePhone = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='page'>
            <h1 className='pagetitle'><UserOutlined /> 修改电话号码</h1>
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
                           绑定
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}

export default ChangePhone;