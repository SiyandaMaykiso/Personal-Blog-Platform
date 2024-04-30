import axios from 'axios';

// Hardcoded URL pointing to the Heroku-hosted backend
const baseUrl = 'https://personal-blog-platform-a11db04dd963.herokuapp.com/posts';

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
