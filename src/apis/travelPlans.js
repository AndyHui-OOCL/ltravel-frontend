import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/travel-plans`,
});

export const getTravelPlanDetailById = async (id) => {
    return await instance.get(`/detail/${id}`);
}

export const getTravelPlanOverview = async (pageNum) => {
    return await instance.get(``, {
        params: {
            page: pageNum,
            size: 9,
        }
    })
}

export const getNumOfTravelPlan = async () => {
    return await instance.get(`/plan-num`);
}