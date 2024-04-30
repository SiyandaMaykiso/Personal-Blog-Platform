import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './services/axiosConfig';  // Import custom axios instance

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const loadPosts = async () => {
      try {
        const response = await axios.get('/posts');  // Use custom axios instance
        setPosts(response.data);
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError('Failed to load posts. Please refresh the page.');
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };

    loadPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);  // Use custom axios instance
      setPosts(posts.filter(post => post.id !== postId));
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError('Failed to delete post. Please try again later.');
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEditPost(post.id)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostsList;
