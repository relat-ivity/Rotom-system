import React from 'react'
import axios from 'axios'
import './Scenepic.css'
import Draggable from 'react-draggable'
import { Button, Checkbox, Form, Input, Upload, Image, Tooltip, Tag } from 'antd';
import { List, Card, Switch, Col, InputNumber, Slider, Select } from 'antd';
import { HomeOutlined, UploadOutlined } from '@ant-design/icons'
import { PlusCircleOutlined, BulbTwoTone, LockTwoTone, ControlTwoTone, DashboardTwoTone } from '@ant-design/icons'
import { SetStateAction, message, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom'

const Scenepic = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [picaddr, setpicaddr] = useState('');
    const [device_data, setdevice] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/device", {
            params: {
                user: params.id,
                scene: params.scenename,
            },
        }).then((response) => {
            const devicelist = JSON.parse(response.data).devicelist;
            for (let i = 0; i < devicelist.length; i++) {
                devicelist[i].value1 = parseInt(devicelist[i].value1str)
                devicelist[i].value2 = parseInt(devicelist[i].value2str)
            }
            setdevice(devicelist)
        }).catch(function (error) {
            console.log(error);
        });
        axios.get("http://localhost:8000/scenepic", {
            params: {
                user: params.id,
                scene: params.scenename,
            },
        }).then((response) => {
            setpicaddr(JSON.parse(response.data).pic)
        }).catch(function (error) {
            console.log(error);
        });
    }, [])

    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            const file = info.fileList[0].originFileObj;
            console.log(file)
            if (file) {
                var reader = new FileReader();
                reader.onload = (event) => {
                    setpicaddr(reader.result)
                    axios.post("http://localhost:8000/updatepic/", {
                        data: {
                            user: params.id,
                            title: params.scenename,
                            pic: picaddr
                        },
                        headers: {
                            "Content-type": "application/json",
                        },
                    },
                    ).then((response) => {
                        const result = response.data.status;
                    }).catch(function (error) {
                        console.log(error);
                    });
                };
            }
            reader.readAsDataURL(file);
        },
        maxCount: 1,
        showUploadList: false,
    };


    const showcard = (item) => {
        switch (item.content) {
            case '智能灯泡':
                return <Draggable><div><Tooltip title={<span style={{ color: 'white' }}>状态：{item.value1 ? '开' : '关'}<br />亮度：{item.value2}</span>}>
                    <Tag className="piccard"><div><BulbTwoTone /> {item.title}</div></Tag></Tooltip></div></Draggable>
            case '智能开关':
                return <Draggable><div><Tooltip title={<span style={{ color: 'white' }}>状态：{item.value1 ? '开' : '关'}</span>}>
                    <Tag className="piccard"><div><ControlTwoTone /> {item.title}</div></Tag></Tooltip></div></Draggable>
            case '传感器':
                return <Draggable><div><Tooltip title={<span style={{ color: 'white' }}>温度：{item.value1}℃<br />湿度：{item.value2}%</span>}>
                    <Tag className="piccard"><div><DashboardTwoTone /> {item.title}</div></Tag></Tooltip></div></Draggable>
            case '智能门锁':
                return <Draggable><div><Tooltip title={<span style={{ color: 'white' }}>状态：{item.value1 ? '开' : '关'}</span>}>
                    <Tag className="piccard" ><div><LockTwoTone /> {item.title}</div></Tag></Tooltip></div></Draggable>
        }
    }

    return (
        <div className='page'>
            <h1 className='pagetitle'><HomeOutlined /> {params.scenename}</h1>
            <h2> · 更改场景背景</h2>
            <div className='upload'>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>选择背景图片</Button>
                </Upload>

            </div>
            <h2> · 场景可视化</h2>
            <Image id='leftpic'
                draggable={false}
                width={800}
                height={800}
                src={picaddr}
                preview={false}
                fallback="data:image/png;base64,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"
            />
            <div id='rightpic'>
                <Card title='智能家居列表（元素可拖动）'>
                    <List className='piclist'
                        grid={{ gutter: 16, column: 1 }}
                        dataSource={device_data}
                        renderItem={(item) => (
                            <List.Item>
                                {showcard(item)}
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    )
}

export default Scenepic;