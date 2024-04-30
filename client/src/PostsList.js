import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axiosConfig';  // Import custom axios instance

function PostsList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get('/posts');  // Use custom axios instance
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);  // Use custom axios instance
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

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
