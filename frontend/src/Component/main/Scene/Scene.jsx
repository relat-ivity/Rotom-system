import React from 'react'
import axios from 'axios'
import './Scene.css'
import { List, Card, Form, Input, Button } from 'antd';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'

const Scene = () => {
    const navigate = useNavigate()


    const [scene_data, setscene] = useState([
        {
            title: '场景一',
            content: '场景信息',
        },
        {
            title: '场景二',
            content: '场景信息',
        },
        {
            title: '场景三',
            content: '场景信息',
        },
        {
            title: '场景四',
            content: '场景信息',
        },
        {
            title: '场景五',
            content: '场景信息',
        },
    ]);

    const onFinish = (values) => {
        console.log('Success:', values);
        let temp=scene_data;
        temp.push({
            title: values.scenename,
            content: values.content,
        })
        temp=[...temp]
        setscene(temp)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div className='page'>
            <h1 className='pagetitle'><HomeOutlined /> 智能家居场景</h1>
            <List className='scenelist'
                grid={{ gutter: 16, column: 4 }}
                dataSource={scene_data}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.title} onClick={()=>{navigate(item.title)}} className="scenecard">{item.content}</Card>
                    </List.Item>
                )}
            />
            <h2><PlusCircleOutlined />  添加场景</h2>
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
                    label="场景名称"
                    name="scenename"
                    rules={[{ required: true, message: '请添加场景名称' }, { type: 'string', max: 8, message: '名称最多八个字' }]}
                >
                    <Input 
                        placeholder="不超过8个字"/>
                </Form.Item>

                <Form.Item
                    label="场景简述"
                    name="content"
                    rules={[{ required: true, message: '请添加场景描述' }, { type: 'string', max: 15, message: '描述最多十五个字' }]}
                >
                    <Input
                        placeholder="不超过10个字"/>
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

export default Scene;