import React, {useState, useEffect} from 'react';
import {Button, Tabs, Card, Typography, Spin} from 'antd';
import {HeartFilled, HeartOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import './LTravelDetail.css';
import {getTravelPlanDetailById} from "../apis/travelPlans";
import GuideHero from './GuideHero';
import {addFavorite, checkFavorite, removeFavorite} from "../apis/userFavorite";

const {Title, Text, Paragraph} = Typography;

const LTravelDetail = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('introduction');
    const [travelDetail, setTravelDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [isParticipateLoading, setIsParticipateLoading] = useState(false);
    const [isParticipate, setIsParticipate] = useState(false);
    const [participateCount, setParticipateCount] = useState(() =>
        Math.floor(Math.random() * 100) + 1
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [detailResponse, favoriteResponse] = await Promise.all([
                    getTravelPlanDetailById(id),
                    checkFavorite(1, id)
                ]);

                setTravelDetail(detailResponse.data);
                setIsFavorited(favoriteResponse.data || false);
            } catch (error) {
                console.error('获取数据失败:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, [id]);

    if (loading) {
        return (
            <div className="travel-detail" style={{textAlign: 'center', padding: '50px'}}>
                <Spin size="large"/>
            </div>
        );
    }

    if (!travelDetail) {
        return (
            <div className="travel-detail" style={{textAlign: 'center', padding: '50px'}}>
                <Text>未找到相关数据</Text>
            </div>
        );
    }

    const handleTabChange = (key) => {
        if (key === 'route') {
            navigate(`/travel-plans/${id}/route`);
        } else if (key === 'review') {
            navigate(`/travel-plans/${id}/reviews`);
        } else {
            setActiveTab(key);
        }
    };

    const handleFavoriteClick = async () => {
        if (favoriteLoading) return;
        setFavoriteLoading(true);
        try {
            if (isFavorited) {
                const response = await removeFavorite(1, id);
                if (response.data === 'Travel Plan is removed successfully') {
                    setIsFavorited(false);
                }
            } else {
                const response = await addFavorite(1, id);
                if (response.data === 'Travel Plan is saved successfully') {
                    setIsFavorited(true);
                }
            }
        } catch (error) {
            console.error('收藏操作失败:', error);
        } finally {
            setFavoriteLoading(false);
        }
    };

    function handleParticipateClick() {
        if (isParticipateLoading) return;
        setIsParticipateLoading(true);

        try {
            setTimeout(() => {
                if (isParticipate) {
                    setParticipateCount(prev => prev - 1);
                    setIsParticipate(false);
                } else {
                    setParticipateCount(prev => prev + 1);
                    setIsParticipate(true);
                }
                setIsParticipateLoading(false);
            }, 500);
        } catch (error) {
            console.error(error);
            setIsParticipateLoading(false);
        }
    }

    const tabItems = [
        {
            key: 'introduction',
            label: '攻略简介',
            children: (
                <div className="introduction-content">

                    <div className="title-row">
                        <Title level={3}>{travelDetail.title}</Title>
                        <Button
                            type="default"
                            onClick={handleFavoriteClick}
                            loading={favoriteLoading}
                            className="favorite-button"
                        >
                            {isFavorited ? (
                                <HeartFilled style={{color: 'red'}}/>
                            ) : (
                                <HeartOutlined/>
                            )}
                            {favoriteLoading ? '处理中...' : (isFavorited ? '已收藏' : '收藏')}
                        </Button>
                    </div>
                    <Paragraph>{travelDetail.description}</Paragraph>

                    <Title level={4}>全程路线</Title>
                    {Object.entries(travelDetail.route).map(([day, locations]) => (
                        <Card key={day} className="route-card">
                            <Text strong>Day{day}</Text>
                            <br/>
                            <Text>{locations.join('—')}</Text>
                        </Card>
                    ))}

                    <Title level={4}>本地特色</Title>
                    <div className="activity-section">
                        {travelDetail.travelLocationEvents.map((event, index) => (
                            <div key={index}>
                                <Title level={5}>{event.eventName}
                                    <Button
                                        type="default"
                                        onClick={handleParticipateClick}
                                        loading={isParticipateLoading}
                                        className="favorite-button"
                                    >
                                        {isParticipate ? (
                                            <StarFilled style={{color: '#FADB14'}}/>
                                        ) : (
                                            <StarOutlined/>
                                        )}
                                        {isParticipateLoading ? '处理中...' : `${participateCount} 人想参与`}
                                    </Button>
                                </Title>
                                <div className="event-images">
                                    {event.locationImages.map((imageUrl, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={imageUrl}
                                            alt={event.eventName}
                                            className="event-image"
                                        />
                                    ))}
                                </div>
                                <Paragraph>{event.description}</Paragraph>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            key: 'route',
            label: '详细路线',
            children: null
        },
        {
            key: 'review',
            label: '攻略评价',
            children: null
        }
    ];

    return (
        <div className="travel-detail">
            <GuideHero travelDetail={travelDetail} activeTab={activeTab}/>

            <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={tabItems}
                className="guide-tabs"
            />
        </div>
    );
};

export default LTravelDetail;