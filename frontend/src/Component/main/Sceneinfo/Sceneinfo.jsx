import React from 'react'
import axios from 'axios'
import './Sceneinfo.css'
import { List, Card, Form, Input, Button, Switch, Col, InputNumber, Slider, Select } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { HashRouter as Router, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom'

const Sceneinfo = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [device_data, setdevice] = useState([
        {
            title: '灯泡一',
            content: '智能灯泡',
            cata: '华为灯泡',
            value1: 1,
            value2: 50,
        },
        {
            title: '灯泡二',
            content: '智能灯泡',
            cata: '华为灯泡',
            value1: 1,
            value2: 50,
        },
        {
            title: '开关三',
            content: '智能开关',
            cata: '小米开关',
            value1: 1,
        },
        {
            title: '传感器',
            content: '传感器',
            cata: '华为温度传感器',
            value1: 26,
            value2: 20
        },
        {
            title: '门锁',
            content: '智能门锁',
            cata: '小米门锁',
            value1: 0,
        },
    ]);

    useEffect(() => { console.log(device_data) }, [])

    const showcard = (item) => {
        switch (item.content) {
            case '智能灯泡':
                return <Card title={item.title} onClick={() => { }} className="devicecard"
                    actions={[
                        <div><Switch onChange={() => { item.value1 = !(item.value1) }} /></div>,
                        <div>
                            <Slider
                                min={20}
                                max={100}
                                className='slider'
                                onChange={(value) => { item.value2 = value; let temp = device_data; temp = [...temp]; setdevice(temp) }}
                                value={item.value2}
                            />
                        </div>
                    ]}
                >类型：{item.content}<br />型号：{item.cata}</Card>
            case '智能开关':
                return <Card title={item.title} onClick={() => { }} className="devicecard"
                    actions={[
                        <div><span style={{ color: 'black' }}>手动开关：</span><Switch onChange={() => { item.value1 = !(item.value1) }} /></div>
                    ]}
                >类型：{item.content}<br />型号：{item.cata}</Card>
            case '传感器':
                return <Card title={item.title} onClick={() => { }} className="devicecard"
                    actions={[
                        <div><span style={{ color: 'black' }}>温度：{item.value1}℃</span></div>,
                        <div><span style={{ color: 'black' }}>湿度：{item.value2}%</span></div>
                    ]}
                >类型：{item.content}<br />型号：{item.cata}</Card>
            case '智能门锁':
                return <Card title={item.title} onClick={() => { }} className="devicecard"
                    actions={[
                        <div><span style={{ color: 'black' }}>状态：{item.value1 ? '开' : '关'}</span></div>
                    ]}
                >类型：{item.content}<br />型号：{item.cata}</Card>
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        let temp = device_data;
        temp.push({
            title: values.devicename,
            content: values.type,
            cata: values.devicecata,
        })
        temp = [...temp]
        setdevice(temp)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='page'>
            <h1 className='pagetitle'><HomeOutlined /> {params.scenename}</h1>
            <List className='scenelist'
                grid={{ gutter: 16, column: 4 }}
                dataSource={device_data}
                renderItem={(item) => (
                    <List.Item>
                        {showcard(item)}
                    </List.Item>
                )}
            />
            <h2><PlusCircleOutlined />  添加设备</h2>
            <Form
                className='sceneform'
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="设备名称"
                    name="devicename"
                    rules={[{ required: true, message: '请输入设备名称' }, { type: 'string', max: 8, message: '名称最多八个字' }]}
                >
                    <Input
                        placeholder="不超过8个字" />
                </Form.Item>

                <Form.Item name="type" label="设备种类" rules={[{ required: true, message:'请选择设备种类' }]}>
                    <Select
                        placeholder="选择设备种类"
                        allowClear
                    >
                        <Select value="智能灯泡">智能灯泡</Select>
                        <Select value="智能开关">智能开关</Select>
                        <Select value="传感器">传感器</Select>
                        <Select value="智能门锁">智能门锁</Select>
                    </Select>
                </Form.Item>


                <Form.Item
                    label="设备型号"
                    name="devicecata"
                    rules={[{ required: true, message: '请输入设备型号' }, { type: 'string', max: 15, message: '型号最多十五个字' }]}
                >
                    <Input
                        placeholder="不超过10个字" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Sceneinfo;