import React from 'react';
import { Tag } from 'antd';

const GuideHero = ({ travelDetail, activeTab }) => {
    const tags = [`${travelDetail.totalTravelDay}天`, travelDetail.localTravel ? '本地旅行' : '异地旅行', '深度旅行'];

    return (
        <div className="guide-hero">
            <div className="placeholder-image hero-image">
                攻略封面图片 - {activeTab}
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