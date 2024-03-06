import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // Include other headers as needed, e.g., Authorization for Bearer tokens
    // 'Authorization': `Bearer ${userToken}`, // Uncomment and use as needed
  }
});

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Optionally, transform the error into a user-friendly message here
    throw error;
  }
};

// Create a new post
export const createPost = async (post) => {
  try {
    const response = await axiosInstance.post('/posts', post);
    return response.data;
  } catch (error) {
    console.error('Error creating a post:', error);
    // Optionally, transform the error into a user-friendly message here
    throw error;
  }
};

// Placeholder for update post function
export const updatePost = async (id, postUpdates) => {
  try {
    const response = await axiosInstance.put(`/posts/${id}`, postUpdates);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Placeholder for delete post function
export const deletePost = async (id) => {
  try {
    const response = await axiosInstance.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
