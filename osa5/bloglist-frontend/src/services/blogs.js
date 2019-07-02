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
const like = (id,blog) => {
  const newBlogObject = {...blog};
  newBlogObject.likes++;
  return axios.put(`${baseUrl}/${id}`,newBlogObject);
};
const remove = (id,token) => {
  return axios.delete(`${baseUrl}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};

export default { getAll, addNew, like, remove };