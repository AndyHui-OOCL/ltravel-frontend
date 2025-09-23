import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/travel-detail`,
});

export const getTravelPlanById = async (id) => {
    try {
        const response = await instance.get(`/route/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching travel plan:', error);
        throw error;
    }
};
