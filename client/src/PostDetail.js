import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; 

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [post, setPost] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await fetch(`https://personal-blog-platform-a11db04dd963.herokuapp.com/posts/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) throw new Error('Failed to fetch post details');

        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
      }
    }
    fetchPostDetails();
  }, [id, authToken]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`https://personal-blog-platform-a11db04dd963.herokuapp.com/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) throw new Error('Failed to delete post');
        alert('Post deleted successfully');
        navigate('/');
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container post-detail-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/post-list')} className="btn btn-secondary">Back to Posts</button>
        <button onClick={() => navigate(`/edit-post/${id}`)} className="btn btn-primary">Edit Post</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
      </div>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p style={{ marginTop: '10px', marginBottom: '20px' }}>{post.content}</p>
        </>
      )}
    </div>
  );
};

export default PostDetail;
