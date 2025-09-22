import React, { useState } from 'react';
import { Button, Tabs, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import GuideIntroduction from './GuideIntroduction';
import GuideRoute from './GuideRoute';
import GuideReviews from './GuideReviews';
import './GuideDetail.css';

const GuideDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('introduction');

  const guideData = {
    title: '北京的一线秋日暖意',
    rating: 4.89,
    tags: ['5天', '小众旅行地', '深度旅行']
  };

  const tabItems = [
    {
      key: 'introduction',
      label: '攻略简介',
      children: <GuideIntroduction />
    },
    {
      key: 'route',
      label: '详细路线',
      children: <GuideRoute />
    },
    {
      key: 'reviews',
      label: '攻略评价',
      children: <GuideReviews />
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

      <div className="guide-tabs">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
        />
      </div>
    </div>
  );
};

export default GuideDetail;
