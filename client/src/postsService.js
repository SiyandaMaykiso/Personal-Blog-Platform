import axios from './services/axiosConfig';  // Assuming axiosConfig.js is in the same directory

export const fetchPost = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post('/posts', postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  await axios.delete(`/posts/${id}`);
};
