import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// 创建axios实例
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 获取旅行计划详情
export const getTravelPlanById = async (id) => {
    try {
        const response = await apiClient.get(`/travel-detail/route/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching travel plan:', error);
        throw error;
    }
};
