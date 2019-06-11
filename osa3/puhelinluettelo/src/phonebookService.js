import axios from "axios";

const apiUrl = "/api/persons";

const getAll = () => {
    return axios.get(apiUrl);
};
const saveNewPerson = (newPerson) => {
    return axios.post(apiUrl,newPerson);
};
const deletePerson = (id) => {
    return axios.delete(`${apiUrl}/${id}`);
};
const replacePerson = (id,newPerson) => {
    return axios.put(`${apiUrl}/${id}`,newPerson);
};

export default {
    getAll: getAll,
    saveNewPerson: saveNewPerson,
    deletePerson: deletePerson,
    replacePerson: replacePerson
};