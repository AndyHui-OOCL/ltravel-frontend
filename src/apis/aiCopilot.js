import axios from "axios";

const instance = axios.create({
    baseURL : `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/ai-chat`
});

export const getAIChatByPrompt = async (inputValue) => {
    return await instance.post('', { prompt: inputValue });
}