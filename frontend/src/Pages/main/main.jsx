import React from 'react'
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios'
import './main.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, HashRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Scene from '../../Component/main/Scene/Scene'
import DrawScene from '../../Component/main/DrawScene/DrawScene'
import ChangePSD from '../../Component/main/ChangePSD/ChangePSD'
import ChangePhone from '../../Component/main/ChangePhone/ChangePhone'
import Sceneinfo from '../../Component/main/Sceneinfo/Sceneinfo';

const { Header, Sider, Content } = Layout;

const MainPage = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout className='mainpage'>
      <Sider trigger={null} >
        <div className='navi'>
          <div className="logobar">
            <img className="logo" src="pic/lotomu.png" width={30} />
            <p className='logotext'>Rotom</p>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={(e) => { navigate(e.key); }}
            items={[
              {
                key: 'scene',
                icon: <UserOutlined />,
                label: '智能家庭场景',
              },
              {
                key: 'drawScene',
                icon: <VideoCameraOutlined />,
                label: '手动绘制场景',
              },
              {
                key: 'accountcenter',
                icon: <UploadOutlined />,
                label: '个人账号中心',
                children: [
                {
                  key: 'changePSD',
                  label: '修改密码',
                },
                {
                  key: 'changePhone',
                  label: '修改手机号',
                },
                {
                  key: '/login',
                  label: '退出登录',
                }]
              }
            ]}
          />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h2 className='pagehead'>Rotom智能家居管理系统</h2>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
          <Route path='scene/:scenename' element={<Sceneinfo />} />
            <Route path='scene' element={<Scene />} />
            <Route path='drawScene' element={<DrawScene />} />
            <Route path='changePSD' element={<ChangePSD />} />
            <Route path='changePhone' element={<ChangePhone />} />
            <Route path='*' element={<Navigate to='scene' />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainPage