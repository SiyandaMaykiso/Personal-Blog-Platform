import axios from 'axios';

const baseUrl = 'http://localhost:3001/posts'; // Adjust if your API's base URL is different

// Fetch all posts
const fetchPosts = async () => {
  const response = await axios.get(baseUrl, { withCredentials: true });
  return response.data;
};

// Add a new post
const createPost = async (postData) => {
  const response = await axios.post(baseUrl, postData, { withCredentials: true });
  return response.data;
};

// Update a post by ID
const editPost = async (id, postData) => {
  const response = await axios.put(`${baseUrl}/${id}`, postData, { withCredentials: true });
  return response.data;
};

// Delete a post by ID
const deletePost = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { withCredentials: true });
};

const postsService = { fetchPosts, createPost, editPost, deletePost };

export default postsService;
