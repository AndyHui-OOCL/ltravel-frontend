import React, { useState } from 'react';
import { Card, Tag } from 'antd';
import './CityFilter.css';

const CityFilter = ({ visible, onClose, onCitySelect, onTravelDaysSelected}) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const cities = [
    '北京', '西安', '上海',
    '青岛', '厦门', '南宁',
    '香港', '济南', '南京'
  ];

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  const handleCityClick = (cityName) => {
      onCitySelect(cityName);
  };

  const handleDayClick = (day) => {
      setSelectedDay(day);
    onTravelDaysSelected(day);
  };

  if (!visible) return null;

  return (
    <div className="city-filter-overlay" onClick={onClose}>
      <Card
        className="city-filter-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="filter-container">
          {/* Left Column - Cities */}
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
                >
                  <span className="city-name">{city}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Days */}
          <div className="days-column">
            <div className="column-header">
              <span className="column-title">行程天数</span>
            </div>
            <div className="days-scroll-container">
              {days.map((day) => (
                <div
                  key={day}
                  className={`day-item ${selectedDay === day ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <Tag className={`day-tag ${selectedDay === day ? 'selected' : ''}`}>
                    {day}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CityFilter;
