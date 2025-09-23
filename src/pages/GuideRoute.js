import React, {useState} from 'react';
import {Button, Card, Rate, Tabs, Typography} from 'antd';
import {ArrowLeftOutlined, ClockCircleOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import './GuideRoute.css';
import useTravelDetail from '../hooks/useTravelDetail';
import useTravelRoute from '../hooks/useTravelRoute';
import TravelDetailLoader from '../components/TravelDetailLoader';
import GuideHero from "./GuideHero";

const {Title, Text, Paragraph} = Typography;

const GuideRoute = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('route');
    const [selectedDay, setSelectedDay] = useState('Day1');
    const [selectedAttraction, setSelectedAttraction] = useState(0);
    const {travelDetail, loading: detailLoading, error: detailError} = useTravelDetail(id);
    const {routeData, loading: routeLoading, error: routeError} = useTravelRoute(id);

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
                    walkTime: null
                };
            });
        });

        return processedData;
    };

    // 使用处理后的API数据
    const apiRouteData = processRouteData();

    // 如果API数据不可用，使用空数组作为fallback
    const currentRoute = apiRouteData[selectedDay] || [];
    const currentAttraction = currentRoute[selectedAttraction] || currentRoute[0];

    // 从API数据中获取可用的天数
    const availableDays = Object.keys(apiRouteData).length > 0
        ? Object.keys(apiRouteData).sort((a, b) => {
            const dayA = parseInt(a.replace('Day', ''));
            const dayB = parseInt(b.replace('Day', ''));
            return dayA - dayB;
          })
        : ['Day1', 'Day2', 'Day3'];

    const handleTabChange = (key) => {
        if (key === 'introduction') {
            navigate(`/travel-plans/detail/${id}`);
        } else if (key === 'review') {
            navigate(`/guide-review/${id}`);
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
                                <div key={item.id} className="route-item">
                                    <div className="route-number">D{index + 1}</div>
                                    <Card className="route-detail-card">
                                        <div className="card-content">
                                            <div className="card-left">
                                                <div className="attraction-image">
                                                    <div className="placeholder-image-small">景点图片</div>
                                                </div>
                                            </div>
                                            <div className="card-right">
                                                <div className="route-header">
                                                    <div className="attraction-info">
                                                        <Text strong className="attraction-name">景点名称：{item.location}</Text>
                                                        <div className="rating-section">
                                                            <Rate disabled defaultValue={5} style={{ fontSize: '12px' }} />
                                                            <Text className="rating-text">{item.rating}</Text>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type={selectedAttraction === index ? 'primary' : 'default'}
                                                        size="small"
                                                        className={`intro-btn ${selectedAttraction === index ? 'selected' : ''}`}
                                                        onClick={() => handleAttractionSelect(index)}
                                                    >
                                                        景点介绍
                                                    </Button>
                                                </div>
                                                <Text className="description">"{item.description}"</Text>
                                                <div className="route-info">
                                                    <Text>开放时间：{item.openTime}</Text>
                                                    <br />
                                                    <Text>景点地址：{item.address}</Text>
                                                </div>
                                            </div>
                                        </div>
                                        {item.walkTime && index < currentRoute.length - 1 && (
                                            <div className="walk-time">
                                                <ClockCircleOutlined />
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
                            <Card title={`景点名称 ${currentAttraction?.location || ''}`} className="attraction-card">
                                <div className="attraction-detail">
                                    <div className="attraction-main-image">
                                        <div className="placeholder-image">景点图片</div>
                                    </div>

                                    <Title level={5}>地点导览</Title>
                                    <Paragraph className="introduction-text">
                                        {currentAttraction?.introduction || '景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍'}
                                    </Paragraph>

                                    <Title level={5}>景点人流量预测</Title>
                                    <div className="crowd-info">
                                        <Text>当前景点情况：人流量较少 适合出行</Text>
                                        <br />
                                        <Text>未来几天人流量：国庆期间人流量各调人流预测，高峰时段为16：00-18：00</Text>
                                    </div>

                                    <Title level={5}>景点信息</Title>
                                    <div className="attraction-details">
                                        <Text>开放时间：{currentAttraction?.openTime || '每周二至周日开放，08:30-17:00'}</Text>
                                        <br />
                                        <Text>地点：{currentAttraction?.address || '地址信息地址'}</Text>
                                        <br />
                                        <Text>门票购买：门票30元/人</Text>
                                        <div className="ticket-toggle">
                                            <Text>开启购票提醒</Text>
                                            <div className="toggle-switch active">
                                                <div className="toggle-knob"></div>
                                            </div>
                                        </div>
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
            label: '官方评价',
            children: null
        }
    ];

    // 合并loading状态和error状态
    const loading = detailLoading || routeLoading;
    const error = detailError || routeError;

    return (
        <TravelDetailLoader loading={loading} travelDetail={travelDetail} error={error}>
            <div className="guide-route">
                <div className="header-nav">
                    <Button
                        icon={<ArrowLeftOutlined/>}
                        type="text"
                        onClick={() => navigate(-1)}
                    >
                        Homepage
                    </Button>
                </div>

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
