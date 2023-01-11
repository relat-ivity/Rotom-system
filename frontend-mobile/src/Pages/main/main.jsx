import React from 'react'
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios'
import './main.css'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, HashRouter as Router, Route, Navigate, Routes, useParams } from 'react-router-dom';
import { Scene, DrawScene, ChangePSD, ChangePhone, Sceneinfo, Scenepic } from "../../Component/main"


const { Header, Sider, Content } = Layout;

const MainPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  
  const [isshow, setisshow] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


 useEffect(()=>{
    if(!sessionStorage[params.id]){
      navigate("/login")
    }
 },[]) 

  return (
    <div className='mainpage'><Layout className='mainlayout'>
      <Sider trigger={null} collapsible collapsed={isshow} >
        <div className='navi'>
          <div className="logobar">
            { !isshow && <div><img className="logo" src="pic/lotomu.png" width={30} />
            <p className='logotext'>Rotom</p></div>}
            {
               isshow && <div><img className="logo2" src="pic/lotomu.png" width={30} /></div>
            }
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={(e) => { navigate(e.key); }}
            items={[
              {
                key: 'scene',
                icon: <HomeOutlined />,
                label: '智能家庭场景',
              },
              {
                key: 'drawScene',
                icon: <VideoCameraOutlined />,
                label: '场景可视化',
              },
              {
                key: 'accountcenter',
                icon: <UserOutlined />,
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
        <Header classname="mainheader" style={{ padding: 0, background: colorBgContainer }}>
          <h2>
          {React.createElement( !isshow ? MenuFoldOutlined : MenuUnfoldOutlined, {
              className: 'trigger',
              onClick: () => setisshow(!isshow),
            })}</h2>
        </Header>
        <Content
          className='maincontent'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className='mainmain'>
            <Routes>
              <Route path='scene/:scenename' element={<Sceneinfo />} />
              <Route path='drawscene/:scenename' element={<Scenepic />} />
              <Route path='scene' element={<Scene />} />
              <Route path='drawScene' element={<DrawScene />} />
              <Route path='changePSD' element={<ChangePSD />} />
              <Route path='changePhone' element={<ChangePhone />} />
              <Route path='*' element={<Navigate to='scene' />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout></div>
  )
}

export default MainPage