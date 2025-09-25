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
import CityTravelDayFilters from "../components/CityTravelDayFilters";
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

  const handleClearSearch = () => {
    clearSearch();
  };

  const getPlaceholderText = () => {
    const cityText = selectedCity ? selectedCity : "";
    const daysText = selectedDays ? `${selectedDays}天` : "";
    const combinedText = `${cityText} ${daysText}`.trim();
    return combinedText || "Search";
  };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header" style={{backgroundColor: '#254000'}}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }}>
                        <img
                            src={"/logo.png"}
                            alt={"L-travel logo"}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                    <span className="logo-icon" style={{color: "white", fontSize: "18px",marginLeft: "5px"}}>L'</span>
                    <span className="logo-text" style={{color: "white", fontSize: "18px"}}>Travel</span>
                </div>
                <div className="header-center">
                    <Input
                        value={getPlaceholderText() === "Search" ? "" : getPlaceholderText()}
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        className="search-input"
                        onClick={handleSearchClick}
                        allowClear
                        onClear={handleClearSearch}
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

            <CityTravelDayFilters
                visible={showCityAndTravelDayFilter}
                onClose={setShowCityAndTravelDayFilter}
                onCitySelect={handleCitySelect}
                onTravelDaysSelected={handleTravelDaySelect}
            />
        </Layout>
    );
};

export default MainLayout;
