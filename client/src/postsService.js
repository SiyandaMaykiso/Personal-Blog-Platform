const axios = require('./services/axiosConfig'); // Correct import path for your Axios configuration

// Utility function for handling errors
const handleError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

// Fetch a single post by its ID
export const fetchPost = async (id) => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch post details');
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await axios.post('/posts', postData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create post');
  }
};

// Update an existing post
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update post');
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    await axios.delete(`/posts/${id}`);
  } catch (error) {
    handleError(error, 'Failed to delete post');
  }
};
