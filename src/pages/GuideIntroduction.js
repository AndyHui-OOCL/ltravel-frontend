import React from 'react';
import { Card, Tag, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import './GuideIntroduction.css';

const { Title, Text, Paragraph } = Typography;

const GuideIntroduction = () => {

  const guideData = {
    title: '北京的一线秋日暖意',
    rating: 4.89,
    tags: ['5天', '小众旅行地', '深度旅行'],
    description: '北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容北京的一线秋日暖意攻略简介内容',
    itinerary: [
      { day: 'Day1', route: '景点一—景点一—景点一—活动一—景点' },
      { day: 'Day2', route: '景点一—景点一—景点一—活动一—景点' },
      { day: 'Day3', route: '景点一—景点一—景点一—活动一—景点' }
    ]
  };

  return (
    <div className="guide-detail">
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

      <div className="guide-tabs">
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
      </div>
    </div>
  );
};

export default GuideIntroduction;
