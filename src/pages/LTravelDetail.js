import React, {useState, useEffect} from 'react';
import {Button, Tabs, Card, Typography, Spin} from 'antd';
import {ArrowLeftOutlined, HeartOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import './LTravelDetail.css';
import {getTravelPlanDetailById} from "../apis/travelPlans";
import GuideHero from './GuideHero';

const {Title, Text, Paragraph} = Typography;

const LTravelDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('introduction');
    const [travelDetail, setTravelDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTravelPlanDetailById(id).then((response) => {
            setTravelDetail(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error('获取数据失败:', error);
            setLoading(false);
        });
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
            navigate(`/guide-route/${id}`);
        } else if (key === 'review') {
            navigate(`/guide-review/${id}`);
        } else {
            setActiveTab(key);
        }
    };

    const tabItems = [
        {
            key: 'introduction',
            label: '攻略简介',
            children: (
                <div className="introduction-content">

                    <div className="title-row">
                        <Title level={3}>{travelDetail.title}</Title>
                        <div className="rating-section">
                            <HeartOutlined/> 收藏
                        </div>
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
                                <Title level={5}>{event.eventName} ⭐️ 2024人喜爱</Title>
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
            label: '官方评价',
            children: null
        }
    ];

    return (
        <div className="travel-detail">
            <div className="header-nav">
                <Button
                    icon={<ArrowLeftOutlined/>}
                    type="text"
                    onClick={() => navigate(-1)}
                >
                    Homepage
                </Button>
            </div>

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