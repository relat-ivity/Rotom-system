import React from 'react'
import axios from 'axios'
import './Sceneinfo.css'
import { base_url } from '../../../index'
import { List, Card, Form, Input, Button, Switch, Col, InputNumber, Slider, Select, Popconfirm } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HomeOutlined, PlusCircleOutlined, BulbTwoTone, LockTwoTone, ControlTwoTone, DashboardTwoTone } from '@ant-design/icons'
import { HashRouter as Router, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom'

const Sceneinfo = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [device_data, setdevice] = useState([
    ]);

    useEffect(()=>{
        axios.get(base_url+"/device",{
            params: {
                user: params.id,
                scene: params.scenename,
            },
        }).then((response)=>{
            const devicelist=JSON.parse(response.data).devicelist;
            for(let i=0;i<devicelist.length;i++){
                devicelist[i].value1=parseInt(devicelist[i].value1str)
                devicelist[i].value2=parseInt(devicelist[i].value2str)
            }
            setdevice(devicelist)
        }).catch(function (error) {
            console.log(error);
        });
    },[])

    const deletedevice = (title) => {
        console.log(params)
        console.log(title)
        let temp=device_data;
        temp=temp.filter(item => item.title != title)
        temp=[...temp]
        setdevice(temp)
        axios.get(base_url+"/deletedevice",{
            params: {
                title: title,
                user: params.id,
                scene: params.scenename,
            },
        }).then((response)=>{
            const result=response.data.status;
            console.log(result)
            alert("删除成功")
        }).catch(function (error) {
            console.log(error);
        });
    }



    const showcard = (item) => {
        switch (item.content) {
            case '智能灯泡':
                return <Card title={<div><BulbTwoTone /> {item.title}</div>} onClick={() => { }} className="devicecard"
                                extra={<Popconfirm
                                    placement="topRight"
                                    title="确认删除此设备吗？"
                                    onConfirm={()=>deletedevice(item.title)}
                                    okText="是"
                                    cancelText="否"
                                ><a>删除</a></Popconfirm>}
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
                            >类型：<strong>{item.content}</strong><br />型号：{item.cata}</Card>
            case '智能开关':
                return <Card title={<div><ControlTwoTone /> {item.title}</div>} onClick={() => { }} className="devicecard"
                                extra={<Popconfirm
                                    placement="topRight"
                                    title="确认删除此设备吗？"
                                    onConfirm={()=>deletedevice(item.title)}
                                    okText="是"
                                    cancelText="否"
                                ><a>删除</a></Popconfirm>}
                                actions={[
                                    <div><span style={{ color: 'black' }}>手动开关：</span><Switch onChange={() => { item.value1 = !(item.value1) }} /></div>
                                ]}
                            >类型：<strong>{item.content}</strong><br />型号：{item.cata}</Card>
            case '传感器':
                return <Card title={<div><DashboardTwoTone /> {item.title}</div>} onClick={() => { }} className="devicecard"
                                extra={<Popconfirm
                                    placement="topRight"
                                    title="确认删除此设备吗？"
                                    onConfirm={()=>deletedevice(item.title)}
                                    okText="是"
                                    cancelText="否"
                                ><a>删除</a></Popconfirm>}
                                actions={[
                                    <div><span style={{ color: 'black' }}>温度：{item.value1}℃</span></div>,
                                    <div><span style={{ color: 'black' }}>湿度：{item.value2}%</span></div>
                                ]}
                            >类型：<strong>{item.content}</strong><br />型号：{item.cata}</Card>
            case '智能门锁':
                return <Card title={<div><LockTwoTone /> {item.title}</div>} onClick={() => { }} className="devicecard"
                                extra={<Popconfirm
                                    placement="topRight"
                                    title="确认删除此设备吗？"
                                    onConfirm={()=>deletedevice(item.title)}
                                    okText="是"
                                    cancelText="否"
                                ><a>删除</a></Popconfirm>}
                                actions={[
                                    <div><span style={{ color: 'black' }}>状态：{item.value1 ? '开' : '关'}</span></div>
                                ]}
                            >类型：<strong>{item.content}</strong><br />型号：{item.cata}</Card>
        }
    }

    const onFinish = (values) => {
        let temp=device_data;
        const search = temp.filter(item=>item.title==values.devicename)
        if(search.length!=0){
            alert("命名重复")
            return;
        }
        if(values.type=='传感器')
        {
            temp.push({
                title: values.devicename,
                content: values.type,
                cata: values.devicecata,
                value1: 26,
                value2: 30,
            })
            temp=[...temp]
            setdevice(temp)
            axios.get(base_url+"/adddevice",{
                params: {
                    title: values.devicename,
                    content: values.type,
                    cata: values.devicecata,
                    value1: 26,
                    value2: 30,
                    user: params.id,
                    scene: params.scenename,
                },
            }).then((response)=>{
                const result=response.data.status;
                console.log(result)
                alert("添加成功")
            }).catch(function (error) {
                console.log(error);
            });
        }
        else
        {
            temp.push({
                title: values.devicename,
                content: values.type,
                cata: values.devicecata,
                value1: 0,
                value2: 50,
            })
            temp=[...temp]
            setdevice(temp)
            console.log(device_data)
            axios.get(base_url+"/adddevice",{
                params: {
                    title: values.devicename,
                    content: values.type,
                    cata: values.devicecata,
                    value1: 0,
                    value2: 50,
                    user: params.id,
                    scene: params.scenename,
                },
            }).then((response)=>{
                const result=response.data.status;
                console.log(result)
                alert("添加成功")
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='page'>
            <h1 className='pagetitle'><HomeOutlined /> {params.scenename}</h1>
            <List className='scenelist'
                grid={{ gutter: 16, column: 1 }}
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