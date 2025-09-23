import React from 'react';
import { Layout, Menu, Input, Avatar} from 'antd';
import {
  HomeOutlined,
  HeartOutlined,
  ScheduleOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
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
      <Header className="header" style={{backgroundColor: '#254000'}}>
        <div className="logo">
          <span className="logo-icon" style={{color: "white"}}>L'</span>
          <span className="logo-text" style={{color: "white"}}>Travel</span>
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
