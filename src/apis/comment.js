import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost:8080/comments/',
    timeout: 5000,
});

export const getCommentsByTravelComponentId = async (id) => {
    return await instance.get(`${id}`);
}