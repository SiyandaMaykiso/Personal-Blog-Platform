import { useAuth } from './contexts/AuthContext'; // Ensure the path is correct

// Utility function for handling errors
const handleError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

// Fetch a single post by its ID
export const fetchPost = async (id) => {
  const { getAuthHeader } = useAuth();
  try {
    const response = await fetch(`https://personal-blog-platform-a11db04dd963.herokuapp.com/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch post details');
    return await response.json();
  } catch (error) {
    handleError(error, 'Failed to fetch post details');
  }
};

// Create a new post
export const createPost = async (postData) => {
  const { getAuthHeader } = useAuth();
  try {
    const response = await fetch('https://personal-blog-platform-a11db04dd963.herokuapp.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return await response.json();
  } catch (error) {
    handleError(error, 'Failed to create post');
  }
};

// Update an existing post
export const updatePost = async (id, postData) => {
  const { getAuthHeader } = useAuth();
  try {
    const response = await fetch(`https://personal-blog-platform-a11db04dd963.herokuapp.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return await response.json();
  } catch (error) {
    handleError(error, 'Failed to update post');
  }
};

// Delete a post
export const deletePost = async (id) => {
  const { getAuthHeader } = useAuth();
  try {
    const response = await fetch(`https://personal-blog-platform-a11db04dd963.herokuapp.com/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to delete post');
  } catch (error) {
    handleError(error, 'Failed to delete post');
  }
};
