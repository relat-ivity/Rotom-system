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
  
  const { Header, Sider, Content } = Layout;

const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return(
        <Layout className='mainpage'>
      <Sider trigger={null}>
        <div className="logobar">
            <img className="logo" src="pic/lotomu.png" width={30}/>
            <p className='logotext'>Rotom</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
    )
}

export default MainPage