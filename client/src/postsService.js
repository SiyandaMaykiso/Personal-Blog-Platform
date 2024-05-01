const axios = require('./services/axiosConfig'); // Correct setup for interceptors

// Utility function for handling errors
const handleError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

export const fetchPost = async (id) => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch post details');
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post('/posts', postData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create post');
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update post');
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`/posts/${id}`);
  } catch (error) {
    handleError(error, 'Failed to delete post');
  }
};
