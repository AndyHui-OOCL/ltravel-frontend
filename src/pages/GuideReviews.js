import React, {useState} from 'react';
import {Typography, Tabs, Button} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './GuideReviews.css';
import TravelDetailLoader from "../components/TravelDetailLoader";
import GuideHero from "./GuideHero";
import useTravelDetail from "../hooks/useTravelDetail";

const { Title, Paragraph } = Typography;

const GuideReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('review');
  const { travelDetail, loading, error } = useTravelDetail(id);

  const handleTabChange = (key) => {
    if (key === 'introduction') {
      navigate(`/travel-plans/detail/${id}`);
    } else if (key === 'route') {
      navigate(`/guide-route/${id}`);
    } else {
      setActiveTab(key);
    }
  };

  const tabItems = [
    {
      key: 'introduction',
      label: '攻略简介',
      children: null
    },
    {
      key: 'route',
      label: '详细路线',
      children: null
    },
    {
      key: 'review',
      label: '官方评价',
      children: null
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

  return (
      <TravelDetailLoader loading={loading} travelDetail={travelDetail} error={error}>
        <div className="guide-reviews">
          <div className="header-nav">
            <Button
                icon={<ArrowLeftOutlined/>}
                type="text"
                onClick={() => navigate(-1)}
            >
              Homepage
            </Button>
          </div>

          <GuideHero travelDetail={travelDetail} activeTab="review" />

          <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              items={tabItems}
              className="guide-tabs"
          />

          <div className="reviews-content">
            <div className="official-rating">
              <Title level={3}>官方推荐评价</Title>
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
        </div>
      </TravelDetailLoader>
  );
};

export default GuideReviews;