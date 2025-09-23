import React, { useState } from 'react';
import { Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const GuideHero = ({ travelDetail }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const tags = [`${travelDetail.totalTravelDay}天`, travelDetail.localTravel ? '本地旅行' : '异地旅行', '深度旅行'];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % travelDetail.planImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? travelDetail.planImages.length - 1 : prev - 1));
    };

    return (
        <div className="guide-hero">
            <div className="hero-image-container">
                <img
                    src={travelDetail.planImages[currentImageIndex]}
                    alt={travelDetail.title}
                    className="hero-image"
                />
                {travelDetail.planImages.length > 1 && (
                    <>
                        <button className="image-nav prev" onClick={prevImage}>
                            <LeftOutlined />
                        </button>
                        <button className="image-nav next" onClick={nextImage}>
                            <RightOutlined />
                        </button>
                        <div className="image-indicators">
                            {travelDetail.planImages.map((_, index) => (
                                <span
                                    key={index}
                                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="guide-tags">
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </div>
        </div>
    );
};

export default GuideHero;
