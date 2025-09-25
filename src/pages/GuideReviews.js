import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import './GuideReviews.css';
import TravelDetailLoader from "../components/TravelDetailLoader";
import GuideHero from "./GuideHero";
import useTravelDetail from "../hooks/useTravelDetail";
import {getOfficialCommentByTravelPlanId} from "../apis/officialComment";
import UserReviewCard from "../components/UserReviewCard";
import {getCommentsByTravelComponentId} from "../apis/comment";
import OfficialReviewCard from '../components/OfficialReviewCard';

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
      navigate(`/travel-plans/${id}/route`);
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

          <GuideHero travelDetail={travelDetail} activeTab="review" />

          <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              items={tabItems}
              className="guide-tabs"
          />

          <OfficialReviewCard loading={commentLoading} officialComment={officialComment} />
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
