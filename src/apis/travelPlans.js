import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost:8080/travel-plans',
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