import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost:8080/official-comment/',
    timeout: 5000,
});

export const getOfficialCommentById = async (id) => {
    return await instance.get(`${id}`);
}