import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Ensure the path is correct

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { authToken, loading: authLoading } = useAuth();

  const fetchPosts = useCallback(async () => {
    if (authLoading || !authToken) {
      if (!authToken) navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://personal-blog-platform-a11db04dd963.herokuapp.com/posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError('Failed to load posts. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [authToken, authLoading, navigate]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`https://personal-blog-platform-a11db04dd963.herokuapp.com/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete post');

      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError('Failed to delete post. Please try again later.');
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleCreatePost = () => {
    navigate('/create-post'); // Update this path as needed
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h2>Posts</h2>
      <button onClick={handleCreatePost} className="btn btn-primary" style={{ marginBottom: '20px' }}>Create New Post</button>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="post-item">
            <h3 className="post-title" onClick={() => navigate(`/posts/${post.id}`)} style={{ cursor: 'pointer' }}>{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <button onClick={() => handleEditPost(post.id)} className="btn btn-secondary">Edit</button>
            <button onClick={() => handleDeletePost(post.id)} className="btn btn-danger">Delete</button>
            <button onClick={() => navigate(`/posts/${post.id}`)} className="btn btn-info">View Details</button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostsList;
