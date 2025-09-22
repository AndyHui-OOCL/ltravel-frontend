import React from 'react';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './GuideReviews.css';

const { Title, Paragraph } = Typography;

const GuideReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    <div className="guide-detail">

      <div className="guide-tabs">
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
      </div>
    </div>
  );
};

export default GuideReviews;

