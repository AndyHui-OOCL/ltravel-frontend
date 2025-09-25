import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/official-comment`,
    timeout: 5000,
});

export const getOfficialCommentByTravelPlanId = async (id) => {
    return await instance.get(`${id}`);
}