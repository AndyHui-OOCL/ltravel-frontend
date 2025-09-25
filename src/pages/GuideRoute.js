import React, {useState, useEffect } from 'react';
import {
  Button,
  Card,
  Tabs,
  Typography,
  Carousel,
  Tag
} from 'antd';
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  FlagOutlined
} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import './GuideRoute.css';
import useTravelDetail from '../hooks/useTravelDetail';
import useTravelRoute from '../hooks/useTravelRoute';
import TravelDetailLoader from '../components/TravelDetailLoader';
import GuideHero from "./GuideHero";
import UserReviewCardInRoute from '../components/UserReviewCardInRoute';
import {getCommentsByTravelComponentId} from "../apis/comment";

const {Title, Text, Paragraph} = Typography;

const GuideRoute = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('route');
    const [selectedDay, setSelectedDay] = useState('Day1');
    const [selectedAttraction, setSelectedAttraction] = useState(0);
    const {travelDetail, loading: detailLoading, error: detailError} = useTravelDetail(id);
    const {routeData, loading: routeLoading, error: routeError} = useTravelRoute(id);
    const [comments, setComments] = useState([]);

    // 处理API数据格式
    const processRouteData = () => {
        if (!routeData || !routeData.route || !routeData.travelComponents) {
            return {};
        }

        const processedData = {};
        const componentsMap = {};

        // 创建组件映射，方便根据名称查找详细信息
        routeData.travelComponents.forEach(component => {
            componentsMap[component.name] = component;
        });

        // 处理路线数据，将天数转换为Day格式，并补充详细信息
        Object.keys(routeData.route).forEach(dayNumber => {
            const dayKey = `Day${dayNumber}`;
            const componentNames = routeData.route[dayNumber];

            processedData[dayKey] = componentNames.map(name => {
                const component = componentsMap[name];
                return {
                    id: component?.id || Math.random(),
                    location: component?.name || name,
                    description: component?.description || '',
                    rating: component?.rating || 4.0,
                    openTime: component?.openTime || '09:00-17:00',
                    address: component?.address || '具体地址待更新',
                    introduction: component?.description || '景点介绍待更新',
                    suggestionPlayTime: component?.suggestionPlayTime || 120,
                    walkTime: null,
                    imageUrl: component?.images && component.images.length > 0 ? component.images[0].url : null,
                    images: component?.images || [],
                    currentOccupation: component?.currentOccupation || 20,
                    futureOccupation: component?.futureOccupation || []
                };
            });
        });

        return processedData;
    };

    // 使用处理后的API数据
    const apiRouteData = processRouteData();

    // 如果API数据不可用，使用空数组作为fallback
    const currentRoute = apiRouteData[selectedDay] || [];
    const currentAttraction = currentRoute[selectedAttraction] || currentRoute[0] || {};
    console.log('Current Attraction:', currentAttraction);
    useEffect(() => {
        if (!currentAttraction?.travelComponentsId) return;

        getCommentsByTravelComponentId(currentAttraction.travelComponentsId)
            .then(response => response.data)
            .then(data => setComments(data))
            .catch(() => setComments([]));
    }, [currentAttraction?.travelComponentsId]);
    // 从API数据中获取可用的天数
    const availableDays = Object.keys(apiRouteData).length > 0
        ? Object.keys(apiRouteData).sort((a, b) => {
            const dayA = parseInt(a.replace('Day', ''));
            const dayB = parseInt(b.replace('Day', ''));
            return dayA - dayB;
        })
        : ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'];

    const handleTabChange = (key) => {
        if (key === 'introduction') {
            navigate(`/travel-plans/detail/${id}`);
        } else if (key === 'review') {
            navigate(`/travel-plans/${id}/reviews`);
        } else {
            setActiveTab(key);
        }
    };

    const handleDayChange = (day) => {
        setSelectedDay(day);
        setSelectedAttraction(0); // 切换天数时重置为第一个景点
    };

    const handleAttractionSelect = (index) => {
        setSelectedAttraction(index);
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
            children: (
                <div className="route-content">
                    <div className="route-left">
                        <div className="day-tabs">
                            {availableDays.map(day => (
                                <Button
                                    key={day}
                                    type={day === selectedDay ? 'primary' : 'default'}
                                    onClick={() => handleDayChange(day)}
                                >
                                    {day}
                                </Button>
                            ))}
                        </div>

                        <Title level={3}>{selectedDay}</Title>

                        <div className="route-timeline">
                            {currentRoute.map((item, index) => (
                                <div key={item.id} className='route-item'>
                                    <div className='route-number'><FlagOutlined/></div>
                                    <Card className="route-detail-card">
                                        <div className="card-content">
                                            <div className='card-left'>
                                                <div className='attraction-image'>
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} alt={item.location}
                                                             className='attraction-image-small'/>
                                                    ) : (
                                                        <div className='placeholder-image-small'>景点图片</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='card-right'>
                                                <div className='route-header'>
                                                    <div className='attraction-info'>
                                                        <Text strong
                                                              className='attraction-name'>景点名称：{item.location}
                                                            <Tag color='green' className='rating-badge'>
                                                                {item.rating?.toFixed(1)}分
                                                            </Tag>
                                                        </Text>
                                                    </div>
                                                    <Button
                                                        type={selectedAttraction === index ? 'primary' : 'default'}
                                                        size='small'
                                                        className={`intro-btn ${selectedAttraction === index ? 'selected' : ''}`}
                                                        onClick={() => handleAttractionSelect(index)}
                                                    >
                                                        景点介绍
                                                    </Button>
                                                </div>
                                                <Text className="description">"{item.description}"</Text>
                                                <div className='route-info'>
                                                    <Text strong
                                                          className='attraction-name'>开放时间：{item.openTime}</Text>
                                                    <Text strong
                                                          className='attraction-name'>景点地址：{item.address}</Text>
                                                </div>
                                            </div>
                                        </div>
                                        {item.walkTime && index < currentRoute.length - 1 && (
                                            <div className="walk-time">
                                                <ClockCircleOutlined/>
                                                <Text>{item.walkTime}</Text>
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="route-right">
                        <div className="sidebar-info">
                            <Card>
                                <div className='attraction-info'>
                                    <Text strong className='component-name'>景点名称：{currentAttraction?.location || ''}
                                        <Tag color='green' className='rating-badge'>
                                            建议游玩时间{(currentAttraction.suggestionPlayTime / 60)?.toFixed(1)}小时
                                        </Tag>
                                    </Text>
                                </div>
                                <div className='attraction-detail'>
                                    <div className='attraction-main-image-img'>
                                        {currentAttraction?.images && currentAttraction.images.length > 0 ? (
                                            <Carousel autoplay arrows>
                                                {currentAttraction.images.map((image, index) => (
                                                    <div key={index}>
                                                        <img src={image.url} alt={currentAttraction.location}
                                                             className='attraction-main-image-img'/>
                                                    </div>
                                                ))}
                                            </Carousel>
                                        ) : currentAttraction?.imageUrl ? (
                                            <Carousel arrows>
                                                <div>
                                                    <img src={currentAttraction.imageUrl}
                                                         alt={currentAttraction.location}
                                                         className='attraction-main-image-img'/>
                                                </div>
                                            </Carousel>
                                        ) : (
                                            <div className='placeholder-image'>景点图片</div>
                                        )}
                                    </div>

                                    <Title level={5}>地点导览</Title>
                                    <Paragraph className='introduction-text'>
                                        {currentAttraction?.introduction || '景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍'}
                                    </Paragraph>

                                    <Title level={5}>景点人流量预测</Title>
                                    <div className='crowd-info'>
                                        <Text
                                            className='crowd-info'>当前景点情况：{currentAttraction?.currentOccupation || '人流量较少 适合出行'}</Text>
                                        <br/>
                                        <Text
                                            className='crowd-info'>未来几天人流量：{currentAttraction?.futureOccupation || '国庆期间人流量各调人流预测，高峰时段为16：00-18：00'}</Text>
                                    </div>

                                    <Title level={5}>景点信息</Title>
                                    <div className='attraction-details'>
                                        <Text
                                            className='crowd-info'>开放时间：{currentAttraction?.openTime || '每周二至周日开放，08:30-17:00'}</Text>
                                        <br/>
                                        <Text
                                            className='crowd-info'>地点：{currentAttraction?.address || '地址信息地址'}</Text>
                                        <br/>
                                        <div className='ticket-toggle'>
                                            {currentAttraction?.ticketUrl ? (
                                                <Button
                                                    type="link"
                                                    onClick={() => window.open(currentAttraction.ticketUrl, '_blank')}
                                                    style={{padding: 0, height: 'auto'}}
                                                >
                                                    在线购票
                                                </Button>
                                            ) : (
                                                <Text style={{color: '#999'}}>暂无购票链接</Text>
                                            )}
                                        </div>
                                    </div>
                                    <Title level={5} style={{marginTop: 24}}>精选用户评论</Title>
                                    <div>
                                        {comments.filter(
                                            c => c.travelComponentName === currentAttraction?.location
                                        ).length === 0 ? (
                                            <div style={{color: '#aaa', fontSize: 13}}>暂无评论</div>
                                        ) : (
                                            comments
                                                .filter(c => c.travelComponentName === currentAttraction?.location)
                                                .slice(0, 5)
                                                .map(comment => (
                                                    <UserReviewCardInRoute key={comment.id} comment={comment}/>
                                                ))
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'review',
            label: '攻略评价',
            children: null
        }
    ];

    // 合并loading状态和error状态
    const loading = detailLoading || routeLoading;
    const error = detailError || routeError;

    return (
        <TravelDetailLoader loading={loading} travelDetail={travelDetail} error={error}>
            <div className='guide-route'>
                <div className='header-nav'></div>
                <GuideHero travelDetail={travelDetail} activeTab="route"/>
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    items={tabItems}
                    className="guide-tabs"
                />
            </div>
        </TravelDetailLoader>
    );
};

export default GuideRoute;
