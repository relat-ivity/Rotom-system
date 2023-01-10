import React from 'react'
import axios from 'axios'
import './Scene.css'
import { List, Card, Form, Input, Button, Popconfirm } from 'antd';
import { HomeOutlined, PlusCircleOutlined, HomeTwoTone } from '@ant-design/icons'
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom'

const Scene = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [scene_data, setscene] = useState([
    ]);

    useEffect(()=>{
        axios.get("http://localhost:8000/scene",{
            params: {
                user: params.id
            },
        }).then((response)=>{
            const scenelist=JSON.parse(response.data).scenelist;
            setscene(scenelist)
        }).catch(function (error) {
            console.log(error);
        });
    },[])

    const onFinish = (values) => {
        console.log('Success:', values);
        let temp=scene_data;
        const search = temp.filter(item=>item.title==values.scenename)
        if(search.length!=0){
            alert("命名重复")
            return;
        }
        temp.push({
            title: values.scenename,
            content: values.content,
        })
        temp=[...temp]
        setscene(temp)
        axios.get("http://localhost:8000/addscene",{
            params: {
                title: values.scenename,
                content: values.content,
                user: params.id
            },
        }).then((response)=>{
            const result=response.data.status;
            console.log(result)
            alert("添加成功")
        }).catch(function (error) {
            console.log(error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    const deletescene = (title) => {
        console.log(title)
        let temp=scene_data;
        temp=temp.filter(item => item.title != title)
        temp=[...temp]
        setscene(temp)
        axios.get("http://localhost:8000/deletescene",{
            params: {
                title: title,
                user: params.id
            },
        }).then((response)=>{
            const result=response.data.status;
            console.log(result)
            alert("删除成功")
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='page'>
            <h1 className='pagetitle'><HomeOutlined /> 智能家居场景</h1>
            <List className='scenelist'
                grid={{ gutter: 16, column: 4 }}
                dataSource={scene_data}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={<div><HomeTwoTone /> <a className='cardtitle' onClick={()=>{navigate(item.title)}} >{item.title}</a></div>} 
                            extra={<Popconfirm
                                            placement="topRight"
                                            title="确认删除此场景吗？"
                                            onConfirm={()=>deletescene(item.title)}
                                            okText="是"
                                            cancelText="否"
                                        ><a>删除</a></Popconfirm>}
                            className="scenecard">
                                {item.content}
                        </Card>
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