import axios from "axios";

const apiUrl = "http://localhost:8000/anecdotes";

const getAll = () => {
    return axios.get(apiUrl);
};
const saveNew = (data) => {
    return axios.post(apiUrl,data);
};

export default { getAll, saveNew };