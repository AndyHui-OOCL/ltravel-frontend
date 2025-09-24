import React, {useEffect, useState} from 'react';
import {Card, Button, Tag, Pagination, Row, Col} from 'antd';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import AiChatSlideBar from "../components/AiChatSlideBar";
import {getNumOfTravelPlan, getTravelPlanOverview} from "../apis/travelPlans";

const { Meta } = Card;

const Homepage = () => {
  const navigate = useNavigate();
  const [travelPlans, setTravelPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTravelPlanNum, setTotalTravelPlanNum] = useState(0);
  const [isAiChatVisible, setAiChatVisible] = useState(false);

    useEffect(() => {
        const fetchTravelPlans = async () => {
            try {
                const response = await getTravelPlanOverview(currentPage);
                setTravelPlans(response.data.content || response.data);
            } catch (err) {
                console.error("failed to fetch travel plans, please try again later");
            } finally {
                console.log("fetch travel plans successfully");
            }
        };
        fetchTravelPlans();
    }, [currentPage]);

    useEffect(() => {
        const fetchTravelPlanNum = async () => {
            try {
                const response = await getNumOfTravelPlan();
                setTotalTravelPlanNum((response.data.content || response.data));
            } catch (err) {
                console.error("failed to fetch total page num, please try again later");
            } finally {
                console.log("fetch travel page num successfully")
            }
        }
        fetchTravelPlanNum()
    }, []);

  const categories = ['小众路线', '深度旅行', '避暑玩水', '当地特色', '最美秋季'];

  const handleCardClick = (planId) => {
    navigate(`/travel-plans/detail/${planId}`);
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
              {travelPlans.map((plan) => (
                <Col xs={24} sm={12} lg={8} key={travelPlans.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="card-cover">
                        <div className="placeholder-image">
                            {plan.travePlanPlanImages && plan.travePlanPlanImages.length > 0 ? (
                                <img
                                    src={plan.travePlanPlanImages[0].url}
                                    alt={plan.cityName}
                                />
                            ) : (
                                <div className="image-placeholder"></div>
                            )}
                                </div>
                        <div className="card-tags">
                            <Tag className="duration-tag">
                                {plan.totalTravelDay} 天
                            </Tag>
                            <Tag className="duration-tag">
                                {plan.totalTravelComponent} 个活动
                            </Tag>
                        </div>
                      </div>
                    }
                    onClick={() => handleCardClick(plan.id)}
                    className="guide-card"
                  >
                    <Meta
                      title={plan.title}
                      description={plan.description}
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
              total={totalTravelPlanNum}
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
