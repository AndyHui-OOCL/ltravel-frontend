import React from 'react';
import { Typography, Tag } from 'antd';

const { Title, Paragraph } = Typography;


const OfficialReviewCard = ({ loading, officialComment }) => (
    <div className="reviews-card">
        {loading ? (
            <Paragraph>Loading...</Paragraph>
        ) : officialComment ? (
            <>
                <div className="official-rating-header">
                    <Title level={3} className="official-title">
                        官方推荐官评价
                        <Tag color="green" className="rating-badge">
                            {officialComment.rating?.toFixed(1)}分
                        </Tag>
                    </Title>
                </div>
                <div className="review-section">
                    <Title level={4} className="section-title">总览路线评价</Title>
                    <Paragraph className="section-content">{officialComment.overallComment}</Paragraph>
                </div>
                <div className="review-section">
                    <Title level={4} className="section-title">本地特色活动评价</Title>
                    <Paragraph className="section-content">{officialComment.eventComment}</Paragraph>
                </div>
                <div className="review-section">
                    <Title level={4} className="section-title">推荐原因</Title>
                    <Paragraph className="section-content">{officialComment.promoteReason}</Paragraph>
                </div>
            </>
        ) : (
            <Paragraph>暂无官方评价</Paragraph>
        )}
    </div>
);

export default OfficialReviewCard;
