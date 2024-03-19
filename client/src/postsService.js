import axios from 'axios';


const baseUrl = 'http://localhost:3001/posts';

export const fetchPosts = async () => {
  const response = await axios.get(baseUrl, { withCredentials: true });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(baseUrl, postData, { withCredentials: true });
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${baseUrl}/${id}`, postData, { withCredentials: true });
  return response.data;
};

export const deletePost = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
};
