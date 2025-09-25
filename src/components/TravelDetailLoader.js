import React from 'react';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

const TravelDetailLoader = ({ children, loading, travelDetail, error }) => {
    if (loading) {
        return (
            <div style={{textAlign: 'center', padding: '50px'}}>
                <Spin size="large"/>
            </div>
        );
    }

    if (error || !travelDetail) {
        return (
            <div style={{textAlign: 'center', padding: '50px'}}>
                <Text>未找到相关数据</Text>
            </div>
        );
    }

    return children;
};

export default TravelDetailLoader;