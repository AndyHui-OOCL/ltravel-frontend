import React, { useState } from 'react';
import { Button, Card, Rate, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './GuideRoute.css';

const { Title, Text, Paragraph } = Typography;

const GuideRoute = () => {
  const [selectedDay, setSelectedDay] = useState('Day1');
  const [selectedAttraction, setSelectedAttraction] = useState(0);

  // 不同天数的路线数据
  const routeData = {
    Day1: [
      {
        id: 1,
        time: '08:30',
        location: '故宫博物院',
        rating: 4.82,
        description: '历史与文化的宝库 了解皇家历史',
        openTime: '每周二至周日开放，08:30-17:00',
        address: '地址信息地址信息',
        walkTime: '步行 | 0.3km 4min',
        introduction: '景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍'
      },
      {
        id: 2,
        time: '11:00',
        location: '故宫博物院',
        rating: 4.82,
        description: '历史与文化的宝库 了解皇家历史',
        openTime: '每周二至周日开放，08:30-17:00',
        address: '地址信息地址信息',
        walkTime: '步行 | 1.7km 9min',
        introduction: '第二个景点的详细介绍内容，包含更多历史文化背景和参观建议...'
      },
      {
        id: 3,
        time: '14:00',
        location: '故宫博物院',
        rating: 4.82,
        description: '历史与文化的宝库 了解皇家历史',
        openTime: '每周二至周日开放，08:30-17:00',
        address: '地址信息地址信息',
        walkTime: '驾车 | 2.1km 8min',
        introduction: '第三个景点的详细介绍内容，提供深入的文化体验...'
      },
      {
        id: 4,
        time: '16:30',
        location: '故宫博物院',
        rating: 4.82,
        description: '历史与文化的宝库 了解皇家历史',
        openTime: '每周二至周日开放，08:30-17:00',
        address: '地址信息地址信息',
        walkTime: '驾车 | 2.1km 8min',
        introduction: '第四个景点的详细介绍内容，展现独特的建筑风格...'
      },
      {
        id: 5,
        time: '18:00',
        location: '故宫博物院',
        rating: 4.82,
        description: '历史与文化的宝库 了解皇家历史',
        openTime: '每周二至周日开放，08:30-17:00',
        address: '地址信息地址信息',
        walkTime: null,
        introduction: '第五个景点的详细介绍内容，完美结束一天的文化之旅...'
      }
    ],
    Day2: [
      {
        id: 6,
        time: '09:00',
        location: '天安门广场',
        rating: 4.75,
        description: '中国的政治文化中心',
        openTime: '全天开放',
        address: '北京市东城区',
        walkTime: '步行 | 0.5km 6min',
        introduction: 'Day2第一个景点的详细介绍内容，感受首都的庄严与宏伟...'
      }
    ],
    Day3: [
      {
        id: 7,
        time: '10:00',
        location: '颐和园',
        rating: 4.68,
        description: '中国古典园林之首',
        openTime: '06:30-18:00',
        address: '北京市海淀区',
        walkTime: '步行 | 1.2km 15min',
        introduction: 'Day3第一个景点的详细介绍内容，体验皇家园林的精致美景...'
      }
    ],
    Day4: [
      {
        id: 8,
        time: '08:00',
        location: '长城',
        rating: 4.90,
        description: '世界文化遗产',
        openTime: '07:00-18:00',
        address: '北京市延庆区',
        walkTime: '驾车 | 50km 1h',
        introduction: 'Day4第一个景点的详细介绍内容，登上万里长城，感受古代工程的伟大...'
      }
    ],
    Day5: [
      {
        id: 9,
        time: '09:30',
        location: '天坛公园',
        rating: 4.72,
        description: '明清皇帝祭天的场所',
        openTime: '06:00-22:00',
        address: '北京市东城区',
        walkTime: '步行 | 0.8km 10min',
        introduction: 'Day5第一个景点的详细介绍内容，探索古代祭天文化的神秘...'
      }
    ],
    Day6: [
      {
        id: 10,
        time: '10:00',
        location: '圆明园',
        rating: 4.65,
        description: '万园之园的历史遗址',
        openTime: '07:00-19:30',
        address: '北京市海淀区',
        walkTime: '步行 | 1.5km 18min',
        introduction: 'Day6第一个景点的详细介绍内容，回顾历史，感受文化的传承...'
      }
    ],
    Day7: [
      {
        id: 11,
        time: '09:00',
        location: '恭王府',
        rating: 4.58,
        description: '清代王府建筑群',
        openTime: '08:30-17:00',
        address: '北京市西城区',
        walkTime: '步行 | 0.7km 8min',
        introduction: 'Day7第一个景点的详细介绍内容，欣赏清代王府的建筑艺术...'
      }
    ]
  };

  const currentRoute = routeData[selectedDay] || [];
  const currentAttraction = currentRoute[selectedAttraction] || currentRoute[0];

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setSelectedAttraction(0); // 切换天数时重置为第一个景点
  };

  const handleAttractionSelect = (index) => {
    setSelectedAttraction(index);
  };

  return (
    <div className="guide-route">
      <div className="route-content">
        <div className="route-left">
          <div className="day-tabs">
            {['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'].map(day => (
              <Button
                key={day}
                type={day === selectedDay ? 'primary' : 'default'}
                onClick={() => handleDayChange(day)}
              >
                {day}
              </Button>
            ))}
          </div>

          <Title level={3}>{selectedDay}</Title>

          <div className="route-timeline">
            {currentRoute.map((item, index) => (
              <div key={item.id} className="route-item">
                <div className="route-number">D{index + 1}</div>
                <Card className="route-detail-card">
                  <div className="card-content">
                    <div className="card-left">
                      <div className="attraction-image">
                        <div className="placeholder-image-small">景点图片</div>
                      </div>
                    </div>
                    <div className="card-right">
                      <div className="route-header">
                        <div className="attraction-info">
                          <Text strong className="attraction-name">景点名称：{item.location}</Text>
                          <div className="rating-section">
                            <Rate disabled defaultValue={5} style={{ fontSize: '12px' }} />
                            <Text className="rating-text">{item.rating}</Text>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          size="small"
                          className="intro-btn"
                          onClick={() => handleAttractionSelect(index)}
                        >
                          景点介绍
                        </Button>
                      </div>
                      <Text className="description">"{item.description}"</Text>
                      <div className="route-info">
                        <Text>开放时间：{item.openTime}</Text>
                        <br />
                        <Text>景点地址：{item.address}</Text>
                      </div>
                    </div>
                  </div>
                  {item.walkTime && index < currentRoute.length - 1 && (
                    <div className="walk-time">
                      <ClockCircleOutlined />
                      <Text>{item.walkTime}</Text>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="route-right">
          <div className="sidebar-info">
            <Card title={`景点名称 ${currentAttraction?.location || ''}`} className="attraction-card">
              <div className="attraction-detail">
                <div className="attraction-main-image">
                  <div className="placeholder-image">景点图片</div>
                </div>

                <Title level={5}>地点导览</Title>
                <Paragraph className="introduction-text">
                  {currentAttraction?.introduction || '景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍'}
                </Paragraph>

                <Title level={5}>景点人流量预测</Title>
                <div className="crowd-info">
                  <Text>当前景点情况：人流量较少 适合出行</Text>
                  <br />
                  <Text>未来几天人流量：国庆期间人XX各调人流预测，高峰时段为16：00-18：00</Text>
                </div>

                <Title level={5}>景点信息</Title>
                <div className="attraction-details">
                  <Text>开放时间：{currentAttraction?.openTime || '每周二至周日开放，08:30-17:00'}</Text>
                  <br />
                  <Text>地点：{currentAttraction?.address || '地址信息地址'}</Text>
                  <br />
                  <Text>门票购买：门票30元/人</Text>
                  <div className="ticket-toggle">
                    <Text>开启购票提醒</Text>
                    <div className="toggle-switch active">
                      <div className="toggle-knob"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideRoute;
