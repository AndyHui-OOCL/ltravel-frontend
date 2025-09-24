import React, { useState } from 'react';
import {Layout, Menu, Input, Avatar} from 'antd';
import {
  HomeOutlined,
  HeartOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './MainLayout.css';
import CityFilter from "../components/CityFilter";
import { useSearch } from "../contexts/SearchContext";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCityAndTravelDayFilter, setShowCityAndTravelDayFilter] = useState(false);
  const { selectedDays, selectedCity, setSelectedDays, setSelectedCity, clearSearch } = useSearch();

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
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleSearchClick = () => {
    setShowCityAndTravelDayFilter(!showCityAndTravelDayFilter);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityAndTravelDayFilter(false);
  };

  const handleTravelDaySelect = (days) => {
      setSelectedDays(days);
      setShowCityAndTravelDayFilter(false);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header" style={{backgroundColor: '#254000'}}>
        <div className="logo">
          <span className="logo-icon" style={{color: "white"}}>L'</span>
          <span className="logo-text" style={{color: "white"}}>Travel</span>
        </div>
        <div className="header-center">
          <Input
            placeholder={`${selectedCity == null ? "": selectedCity} ${selectedDays == null ? "" : selectedDays + "天"}` || "Search"}
            prefix={<SearchOutlined />}
            className="search-input"
            onClick={handleSearchClick}
            readOnly
            allowClear={true}
            onChange={clearSearch}
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

      <CityFilter
        visible={showCityAndTravelDayFilter}
        onClose={setShowCityAndTravelDayFilter}
        onCitySelect={handleCitySelect}
        onTravelDaysSelected={handleTravelDaySelect}
      />
    </Layout>
  );
};

export default MainLayout;
