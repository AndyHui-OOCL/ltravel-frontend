import React, { useState } from 'react';
import { Layout, Menu, Input, Button, Avatar, Drawer } from 'antd';
import {
  HomeOutlined,
  HeartOutlined,
  ScheduleOutlined,
  SearchOutlined,
  UserOutlined,
  RobotOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import AICopilot from '../components/AICopilot';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Homepage',
    },
    {
      key: '/favorite',
      icon: <HeartOutlined />,
      label: 'Favorite',
    },
    {
      key: '/itinerary',
      icon: <ScheduleOutlined />,
      label: 'My Itinerary',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo">
          <span className="logo-icon">L'</span>
          <span className="logo-text">Travel</span>
        </div>
        <div className="header-center">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search-input"
          />
        </div>
        <div className="header-right">
          <Avatar icon={<UserOutlined />} />
          <span className="sign-up">Sign Up</span>
        </div>
      </Header>

      <Layout>
        <Sider width={200} className="sidebar">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="sidebar-menu"
          />
        </Sider>

        <Content className="main-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
