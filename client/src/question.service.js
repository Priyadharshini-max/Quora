import axios from "axios";
const API_URL = "https://quora-api-01.herokuapp.com";

const addQuestion = (data) => {
    return axios.post(`${API_URL}/postquestion`, data);
};

const getQuestion = () => {
    return axios.get(`${API_URL}/getquestion`);
};

export { addQuestion, getQuestion };
