    import axios from "axios";

    const instance = axios.create({
        baseURL : `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/comments`,
        timeout: 5000,
    });

    export const getCommentsByTravelComponentId = async (id) => {
        return await instance.get(`${id}`);
    }
    export const pageCommentsByTravelPlanId = async (commentReqDTO) => {
        return await instance.get('', {
            params: commentReqDTO
        });
    }