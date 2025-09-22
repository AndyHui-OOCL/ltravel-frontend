import React from 'react';
import { Button, Card, Rate, Typography } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './GuideRoute.css';

const { Title, Text, Paragraph } = Typography;

const GuideRoute = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const detailedRoute = [
    {
      time: '08:30',
      location: '故宫博物院',
      rating: 4.91,
      description: '明清皇家宫殿博物院，集合了中华传统文化的精华',
      openTime: '08:30-17:00',
      address: '明清皇家宫殿博物馆',
      duration: '2小时30分钟',
      walkTime: '步行 | 0.3km4min'
    },
    {
      time: '11:00',
      location: '故宫博物院',
      rating: 4.91,
      description: '明清皇家宫殿博物院，集合了中华传统文化的精华',
      openTime: '08:30-17:00',
      address: '明清皇家宫殿博物馆',
      duration: '1.7km5min',
      walkTime: '驾车 | 1.7km5min'
    }
  ];

  return (
    <div className="guide-route">

      <div className="route-content">
        <div className="route-left">
          <div className="day-tabs">
            {['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'].map(day => (
              <Button key={day} type={day === 'Day1' ? 'primary' : 'default'}>
                {day}
              </Button>
            ))}
          </div>

          <Title level={3}>Day1</Title>

          <div className="route-timeline">
            {detailedRoute.map((item, index) => (
              <div key={index} className="route-item">
                <div className="route-number">{index + 1}</div>
                <Card className="route-detail-card">
                  <div className="route-header">
                    <Text strong>{item.location}</Text>
                    <Rate disabled defaultValue={item.rating} />
                    <Text>{item.rating}</Text>
                    <Text type="secondary">查看介绍</Text>
                  </div>
                  <Text>{item.description}</Text>
                  <div className="route-info">
                    <Text>开放时间：{item.openTime}</Text>
                    <br />
                    <Text>景点：{item.address}</Text>
                    <br />
                    <Text>门票价格：门票30元/人</Text>
                  </div>
                  {item.walkTime && (
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
            <Card title="景点名称 景点名称" className="attraction-card">
              <div className="placeholder-image">景点图片</div>
              <Title level={5}>地点导览</Title>
              <Paragraph>景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍</Paragraph>

              <Title level={5}>景点人流量预测</Title>
              <Text>当前拥挤情况：人潮涌动，建议错峰出行</Text>
              <br />
              <Text>本周人流高峰：周四发现高峰时间</Text>
              <br />
              <Text>开放时间：周一二三日开放，08:30-17:00</Text>
              <br />
              <Text>地点：朝阳区朝阳北路</Text>
              <br />
              <Text>门票价格：门票30元/人</Text>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideRoute;
