import React, { useState, useRef, useEffect } from 'react';
import { Card, Tag } from 'antd';
import './CityTravelDayFilter.css';

const CityFilter = ({ visible, onClose, onCitySelect, onTravelDaysSelected}) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const filterRef = useRef(null);

    const cities = [
        '北京', '西安', '上海',
        '青岛', '厦门', '南宁',
        '香港', '济南', '南京'
    ];

    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    const handleCityClick = (cityName) => {
        setSelectedCity(cityName);
        onCitySelect(cityName);
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        onTravelDaysSelected(day);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className="city-filter-overlay">
            <Card
                className="city-filter-card"
                ref={filterRef}
            >
                <div className="filter-container">
                    <div className="cities-column">
                        <div className="column-header">
                            <span className="column-title">热门城市</span>
                        </div>
                        <div className="cities-grid">
                            {cities.map((city, index) => (
                                <div
                                    key={index}
                                    className="city-item"
                                    onClick={() => handleCityClick(city)}
                                    style={{
                                        backgroundColor: selectedCity === city ? '#1890ff' : '#ffffff',
                                    }}
                                >
                  <span className="city-name" style={{color: selectedCity === city ? '#fff' : '#333',
                  }}>{city}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="days-column">
                        <div className="column-header">
                            <span className="column-title">行程天数</span>
                        </div>
                        <div className="days-scroll-container">
                            {days.map((day) => (
                                <Tag
                                    key={day}
                                    className={`day-tag ${selectedDay === day ? 'selected' : ''}`}
                                    onClick={() => handleDayClick(day)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 0 8px 0',
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        backgroundColor: selectedDay === day ? '#1890ff' : '#ffffff',
                                        color: selectedDay === day ? '#fff' : '#333',
                                        border: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {day} 天
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CityFilter;