import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    // Handle errors (e.g., logging or displaying error messages)
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Create a new post
export const createPost = async (post) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  } catch (error) {
    console.error('Error creating a post:', error);
    throw error;
  }
};

// Add more functions for updating and deleting posts as needed
