import React, { useState } from 'react';
import {Card, Button, Tag, Pagination, Row, Col, Drawer} from 'antd';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import {CloseOutlined, RobotOutlined} from "@ant-design/icons";
import AICopilot from "../components/AICopilot";
import AiChatSlideBar from "../components/AiChatSlideBar";

const { Meta } = Card;

const Homepage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAiChatVisible, setAiChatVisible] = useState(false);

  const categories = ['小众路线', '深度旅行', '避暑玩水', '当地特色', '最美秋季'];

  const travelGuides = [
    {
      id: 1,
      title: '腾冲我在腾冲很想越活',
      image: '/api/placeholder/300/200',
      days: '5天',
      duration: '15个行程',
      tags: ['5天', '15个行程']
    },
    {
      id: 2,
      title: '西宁|大西北色卡🎨徐徐了一场五彩斑斓的梦',
      image: '/api/placeholder/300/200',
      days: '3天',
      duration: '13个行程',
      tags: ['3天', '13个行程']
    },
    {
      id: 3,
      title: '泰皇岛|阳光沙滩，在阿那亚的48h',
      image: '/api/placeholder/300/200',
      days: '2天',
      duration: '8个行程',
      tags: ['2天', '8个行程']
    },
    {
      id: 4,
      title: '西宁|大西北色卡🎨徐徐了一场五彩斑斓的梦',
      image: '/api/placeholder/300/200',
      days: '3天',
      duration: '13个行程',
      tags: ['3天', '13个行程']
    },
    {
      id: 5,
      title: '腾冲我在腾冲很想越活',
      image: '/api/placeholder/300/200',
      days: '5天',
      duration: '15个行程',
      tags: ['5天', '15个行程']
    },
    {
      id: 6,
      title: '西宁|大西北色卡🎨徐徐了一场五彩斑斓的梦',
      image: '/api/placeholder/300/200',
      days: '3天',
      duration: '13个行程',
      tags: ['3天', '13个行程']
    }
  ];

  const handleCardClick = (guideId) => {
    navigate(`/guide/${guideId}`);
  };

  return (
    <>
        <div className="homepage">
          <div className="hero-section">
            <div className="hero-content">
              <h1>Where would you like to go today?</h1>
              <Button type="primary" size="large" className="ask-ai-btn" onClick={() => setAiChatVisible(true)}>
                Ask AI assistant →
              </Button>
            </div>
          </div>

          <div className="categories-section">
            <div className="categories">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  type={index === 0 ? 'primary' : 'default'}
                  className="category-btn"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="guides-section">
            <Row gutter={[24, 24]}>
              {travelGuides.map((guide) => (
                <Col xs={24} sm={12} lg={8} key={guide.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="card-cover">
                        <div className="placeholder-image">
                          <div className="image-placeholder"></div>
                        </div>
                        <div className="card-tags">
                          {guide.tags.map((tag, index) => (
                            <Tag key={index} className="duration-tag">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    }
                    onClick={() => handleCardClick(guide.id)}
                    className="guide-card"
                  >
                    <Meta
                      title={guide.title}
                      className="card-meta"
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="pagination-section">
            <Pagination
              current={currentPage}
              total={90}
              pageSize={6}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </div>
        <AiChatSlideBar isAiChatVisible = {isAiChatVisible} setAiChatVisible = {setAiChatVisible}/>
    </>
  );
};

export default Homepage;
