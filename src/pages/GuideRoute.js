import React, {useState} from 'react';
import {Button, Card, Rate, Tabs, Typography} from 'antd';
import {ArrowLeftOutlined, ClockCircleOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import './GuideRoute.css';
import useTravelDetail from '../hooks/useTravelDetail';
import TravelDetailLoader from '../components/TravelDetailLoader';
import GuideHero from "./GuideHero";

const {Title, Text, Paragraph} = Typography;

const GuideRoute = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('route');
    const [selectedDay, setSelectedDay] = useState('Day1');
    const [selectedAttraction, setSelectedAttraction] = useState(0);
    const {travelDetail, loading, error} = useTravelDetail(id);

    // 不同天数的路线数据
    const routeData = {
        Day1: [
            {
                id: 1,
                time: '08:30',
                location: '故宫博物院',
                rating: 4.82,
                description: '历史与文化的宝库 了解皇家历史',
                openTime: '每周二至周日开放，08:30-17:00',
                address: '地址信息地址信息',
                walkTime: '步行 | 0.3km 4min',
                introduction: '景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍景点介绍'
            },
            {
                id: 2,
                time: '11:00',
                location: '天安门广场',
                rating: 4.75,
                description: '中国的政治文化中心',
                openTime: '全天开放',
                address: '北京市东城区',
                walkTime: '步行 | 1.7km 9min',
                introduction: '第二个景点的详细介绍内容，包含更多历史文化背景和参观建议...'
            },
            {
                id: 3,
                time: '14:00',
                location: '颐和园',
                rating: 4.68,
                description: '中国古典园林之首',
                openTime: '06:30-18:00',
                address: '北京市海淀区',
                walkTime: '驾车 | 2.1km 8min',
                introduction: '第三个景点的详细介绍内容，提供深入的文化体验...'
            },
            {
                id: 4,
                time: '16:30',
                location: '天坛公园',
                rating: 4.72,
                description: '明清皇帝祭天的场所',
                openTime: '06:00-22:00',
                address: '北京市东城区',
                walkTime: '驾车 | 2.1km 8min',
                introduction: '第四个景点的详细介绍内容，展现独特的建筑风格...'
            },
            {
                id: 5,
                time: '18:00',
                location: '王府井大街',
                rating: 4.50,
                description: '北京著名商业街',
                openTime: '全天开放',
                address: '北京市东城区',
                walkTime: null,
                introduction: '第五个景点的详细介绍内容，完美结束一天的文化之旅...'
            }
        ],
        Day2: [
            {
                id: 6,
                time: '09:00',
                location: '长城',
                rating: 4.90,
                description: '世界文化遗产',
                openTime: '07:00-18:00',
                address: '北京市延庆区',
                walkTime: '驾车 | 50km 1h',
                introduction: 'Day2第一个景点的详细介绍内容，登上万里长城，感受古代工程的伟大...'
            }
        ],
        Day3: [
            {
                id: 7,
                time: '10:00',
                location: '圆明园',
                rating: 4.65,
                description: '万园之园的历史遗址',
                openTime: '07:00-19:30',
                address: '北京市海淀区',
                walkTime: '步行 | 1.2km 15min',
                introduction: 'Day3第一个景点的详细介绍内容，回顾历史，感受文化的传承...'
            }
        ],
        Day4: [
            {
                id: 8,
                time: '08:00',
                location: '恭王府',
                rating: 4.58,
                description: '清代王府建筑群',
                openTime: '08:30-17:00',
                address: '北京市西城区',
                walkTime: '步行 | 0.7km 8min',
                introduction: 'Day4第一个景点的详细介绍内容，欣赏清代王府的建筑艺术...'
            }
        ],
        Day5: [
            {
                id: 9,
                time: '09:30',
                location: '北海公园',
                rating: 4.60,
                description: '皇家园林公园',
                openTime: '06:30-20:00',
                address: '北京市西城区',
                walkTime: '步行 | 0.8km 10min',
                introduction: 'Day5第一个景点的详细介绍内容，探索皇家园林的美景...'
            }
        ],
        Day6: [
            {
                id: 10,
                time: '10:00',
                location: '雍和宫',
                rating: 4.55,
                description: '清代藏传佛教寺院',
                openTime: '09:00-16:30',
                address: '北京市东城区',
                walkTime: '步行 | 1.5km 18min',
                introduction: 'Day6第一个景点的详细介绍内容，感受佛教文化的庄严...'
            }
        ],
        Day7: [
            {
                id: 11,
                time: '09:00',
                location: '什刹海',
                rating: 4.45,
                description: '北京历史文化保护区',
                openTime: '全天开放',
                address: '北京市西城区',
                walkTime: '步行 | 0.7km 8min',
                introduction: 'Day7第一个景点的详细介绍内容，体验老北京的胡同文化...'
            }
        ]
    };

    const currentRoute = routeData[selectedDay] || [];
    const currentAttraction = currentRoute[selectedAttraction] || currentRoute[0];

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
                            {['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'].map(day => (
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
