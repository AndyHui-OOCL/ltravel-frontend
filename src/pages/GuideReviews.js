import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Button, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './GuideReviews.css';
import TravelDetailLoader from "../components/TravelDetailLoader";
import GuideHero from "./GuideHero";
import useTravelDetail from "../hooks/useTravelDetail";
import {getOfficialCommentByTravelPlanId} from "../apis/officialComment";
import UserReviewCard from "../components/UserReviewCard";
import {getCommentsByTravelComponentId} from "../apis/comment";

const { Title, Paragraph } = Typography;

const GuideReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('review');
  const { travelDetail, loading, error } = useTravelDetail(id);

  const [officialComment, setOfficialComment] = useState(null);
  const [commentLoading, setCommentLoading] = useState(true);
  const [userComments, setUserComments] = useState([]);
  const [userCommentsLoading, setUserCommentsLoading] = useState(true);

  useEffect(() => {
    setCommentLoading(true);
    getOfficialCommentByTravelPlanId(id)
        .then(response => response.data)
        .then(data => {
          setOfficialComment(data);
          setCommentLoading(false);
        })
        .catch(() => setCommentLoading(false));
  }, [id]);
  useEffect(() => {
    setUserCommentsLoading(true);
    getCommentsByTravelComponentId(id)
        .then(response => response.data)
        .then(data => {
          setUserComments(data);
          setUserCommentsLoading(false);
        })
        .catch(() => setUserCommentsLoading(false));
  }, [id]);

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
    { key: 'introduction', label: '攻略简介', children: null },
    { key: 'route', label: '详细路线', children: null },
    { key: 'review', label: '攻略评价', children: null }
  ];

  return (
      <TravelDetailLoader loading={loading} travelDetail={travelDetail} error={error}>
        <div className="guide-reviews">
          <div className="header-nav">
            <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                onClick={() => navigate('/')}
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

          <div className="reviews-card">
            {commentLoading ? (
                <Paragraph>Loading...</Paragraph>
            ) : officialComment ? (
                <>
                  <div className="official-rating-header">
                    <Title level={3} className="official-title">
                      官方推荐官评价
                      <Tag color="green" className="rating-badge">
                        {officialComment.rating?.toFixed(1)}分
                      </Tag>
                    </Title>
                  </div>
                  <div className="review-section">
                    <Title level={4} className="section-title">总览路线评价</Title>
                    <Paragraph className="section-content">{officialComment.overallComment}</Paragraph>
                  </div>
                  <div className="review-section">
                    <Title level={4} className="section-title">本地特色活动评价</Title>
                    <Paragraph className="section-content">{officialComment.eventComment}</Paragraph>
                  </div>
                  <div className="review-section">
                    <Title level={4} className="section-title">推荐原因</Title>
                    <Paragraph className="section-content">{officialComment.promoteReason}</Paragraph>
                  </div>
                </>
            ) : (
                <Paragraph>暂无官方评价</Paragraph>
            )}
          </div>
          <div className="user-reviews-card" bordered={false}>
            <Title level={3} style={{ marginBottom: 24 }}>用户评价</Title>
            {userCommentsLoading ? (
                <Paragraph>Loading...</Paragraph>
            ) : userComments!==null & userComments.length > 0 ? (
                userComments.map(comment => (
                    <UserReviewCard key={comment.id} comment={comment} />
                ))
            ) : (
                <Paragraph>暂无用户评价</Paragraph>
            )}
          </div>
        </div>
      </TravelDetailLoader>
  );
};

export default GuideReviews;
