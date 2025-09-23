import React from 'react';
import { Avatar, Tag } from 'antd';
import { UserOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './UserReviewCard.css';

/**
 * UserReviewCard displays a single user comment.
 * @param {Object} props
 * @param {Object} props.comment - The comment object.
 */
const UserReviewCard = ({ comment }) => (
    <div className="user-review-card">
        <Avatar icon={<UserOutlined />} className="user-avatar" />
        <div className="user-review-content">
            <div className="user-review-header">
                <span className="user-name">@用户名</span>
                <Tag color="gold" className="review-tag">
                    {comment.isLike ? <><LikeOutlined /> 景点点评</> : <><MessageOutlined /> 小槽点</>}
                </Tag>
            </div>
            <div className="user-review-description">{comment.description}</div>
        </div>
    </div>
);

export default UserReviewCard;
