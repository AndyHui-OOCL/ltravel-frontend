import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/users`,
});

export const addFavorite = async (userId, travelPlanId) => {
    return await instance.post(`/like/${travelPlanId}?userId=${userId}`);
}

export const removeFavorite = async (userId, travelPlanId) => {
    return await instance.delete(`/unlike/${travelPlanId}?userId=${userId}`);
}

export const checkFavorite = async (userId, travelPlanId) => {
    return await instance.get(`/like-status/${travelPlanId}?userId=${userId}`);
}

export const getUserFavorites = async (userId, page = 0, size = 10) => {
    return await instance.get(`/favorite-plans?userId=${userId}&page=${page}&size=${size}`);
};