import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = () => {
  return axios.get(baseUrl);
};
const addNew = (newBlog,token) => {
  return axios.post(baseUrl,newBlog,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default { getAll, addNew };