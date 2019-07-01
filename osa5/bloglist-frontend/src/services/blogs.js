import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = () => {
  return axios.get(baseUrl);
};

export default { getAll };