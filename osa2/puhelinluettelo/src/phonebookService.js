import axios from "axios";

const apiUrl = "http://localhost:8000/persons";

const getAll = () => {
    return axios.get(apiUrl);
};

export default {
    getAll: getAll
}