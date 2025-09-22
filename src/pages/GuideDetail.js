import React, { useState } from 'react';
import { Button, Tabs, Card, Tag, Timeline, Rate, Avatar, Typography } from 'antd';
import { ArrowLeftOutlined, HeartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './GuideDetail.css';

const { Title, Text, Paragraph } = Typography;

const GuideDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('introduction');

  const guideData = {
    title: '北京的一线秋日暖意',
    rating: 4.89,
    tags: ['5天', '小众旅行地', '深度旅行'],
    description: '北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容',
    itinerary: [
      { day: 'Day1', route: '景点一—景点一—景点一—活动一—景点' },
      { day: 'Day2', route: '景点一—景点一—景点一—活动一—景点' },
      { day: 'Day3', route: '景点一—景点一—景点一—活动一—景点' }
    ],
    activities: [
      {
        name: '故宫博物院',
        rating: 4.91,
        description: '明清皇家宫殿博物院，集合了中华传统文化的精华',
        time: '08:30-17:00',
        location: '明清皇家宫殿博物馆',
        duration: '2小时30分钟'
      }
    ]
  };

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

  const reviews = {
    officialRating: 4.89,
    sections: [
      {
        title: '总览路线评价',
        content: '景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍'
      },
      {
        title: '本地特色活动评价',
        content: '景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍景点介绍高介绍'
      },
      {
        title: '推荐原因',
        content: '推荐原因是什么样的人出游，对于什么样的问题兴趣的朋友可以选择这个...'
      }
    ]
  };

  const tabItems = [
    {
      key: 'introduction',
      label: '攻略简介',
      children: (
        <div className="introduction-content">
          <Title level={3}>{guideData.title}</Title>
          <div className="rating-section">
            <HeartOutlined /> 收藏
          </div>
          <Paragraph>{guideData.description}</Paragraph>

          <Title level={4}>全程路线</Title>
          {guideData.itinerary.map((item, index) => (
            <Card key={index} className="route-card">
              <Text strong>{item.day}</Text>
              <br />
              <Text>{item.route}</Text>
            </Card>
          ))}

          <Title level={4}>本地特色</Title>
          <div className="activity-section">
            <Title level={5}>活动名称 ⭐️ 2024人喜爱</Title>
            <div className="placeholder-image">活动图片区域</div>
            <Paragraph>活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍</Paragraph>

            <Title level={5}>活动名称 ⭐️ 2024人喜爱</Title>
            <div className="placeholder-image">活动图片区域</div>
            <Paragraph>活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍</Paragraph>
          </div>
        </div>
      )
    },
    {
      key: 'route',
      label: '详细路线',
      children: (
        <div className="route-content">
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
      )
    },
    {
      key: 'reviews',
      label: '攻略评价',
      children: (
        <div className="reviews-content">
          <div className="official-rating">
            <Title level={3}>官方推荐官评价</Title>
            <div className="rating-display">
              <span className="rating-number">{reviews.officialRating}</span>
            </div>
          </div>

          {reviews.sections.map((section, index) => (
            <div key={index} className="review-section">
              <Title level={4}>{section.title}</Title>
              <div className="placeholder-image">图片区域</div>
              <Paragraph>{section.content}</Paragraph>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="guide-detail">
      <div className="header-nav">
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate(-1)}
        >
          Homepage
        </Button>
      </div>

      <div className="guide-hero">
        <div className="placeholder-image hero-image">
          攻略封面图片
        </div>
        <div className="guide-tags">
          {guideData.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="guide-tabs"
      />
    </div>
  );
};

export default GuideDetail;
