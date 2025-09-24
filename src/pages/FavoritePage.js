import React, {useEffect, useState} from 'react';
import {Card, Tag, Pagination, Row, Col, Typography, Empty, Spin} from 'antd';
import {HeartFilled} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './FavoritePage.css';
import {getUserFavorites} from "../apis/userFavorite";

const { Meta } = Card;

const FavoritePage = () => {
    const navigate = useNavigate();
    const [favoritePlans, setFavoritePlans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoritePlans = async () => {
            setLoading(true);
            try {
                const response = await getUserFavorites(1, currentPage - 1, 10);
                setFavoritePlans(response.data.content || []);
                setTotalElements(response.data.totalElements || 0);
            } catch (err) {
                console.error("获取收藏列表失败:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavoritePlans();
    }, [currentPage]);

    const handleCardClick = (planId) => {
        navigate(`/travel-plans/detail/${planId}`, { state: { from: 'favorite' } });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="favorite-page" style={{textAlign: 'center', padding: '50px'}}>
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <div className="favorite-page">
            <div className="favorites-section">
                {favoritePlans.length === 0 ? (
                    <Empty
                        description="暂无收藏的旅行计划"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    <Row gutter={[24, 24]}>
                        {favoritePlans.map((plan) => (
                            <Col xs={24} sm={12} lg={8} key={plan.id}>
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
                                    className="guide-card favorite-card"
                                >
                                    <Meta
                                        title={plan.title || plan.cityName}
                                        description={plan.description}
                                        className="card-meta"
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            {totalElements > 10 && (
                <div className="pagination-section">
                    <Pagination
                        current={currentPage}
                        total={totalElements}
                        pageSize={10}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
};

export default FavoritePage;