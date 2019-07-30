import axios from "axios";

const baseUrl = "/api";

const login = (username,password) => {
    return axios.post(`${baseUrl}/login`,{
        username: username,
        password: password
    });
};
const getAll = () => {
    return axios.get(`${baseUrl}/users`);
};

export default { login, getAll };