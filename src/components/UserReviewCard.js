import React from 'react';
import { Avatar, Tag } from 'antd';
import { UserOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './UserReviewCard.css';
import PropTypes from 'prop-types';
const UserReviewCard = ({ comment }) => (
    <div className="user-review-card">
        <Avatar icon={<UserOutlined />} className="user-avatar" />
        <div className="user-review-content">
            <div className="user-review-header">
                <span className="user-name">{comment.username || '匿名用户'}</span>
                {comment.travelComponentName && (
                    <Tag color="green" className="review-tag">
                        {comment.travelComponentName}
                    </Tag>
                )}
                <Tag color={comment.isLike ? 'gold' : 'default'} className="review-tag">
                    {comment.isLike ? <><LikeOutlined /> 喜欢它</> : <><MessageOutlined /> 小槽点</>}
                </Tag>
            </div>
            <div className="user-review-description">{comment.description}</div>
        </div>
    </div>
);

UserReviewCard.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
        isLike: PropTypes.bool,
        travelComponentName: PropTypes.string,
        username: PropTypes.string,
    }).isRequired,
};

export default UserReviewCard;
