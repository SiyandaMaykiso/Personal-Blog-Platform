import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Requests now rely on session cookies instead of JWTs
        const response = await axios.get('http://localhost:3001/posts', {
          withCredentials: true // Ensure cookies are included with the request
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []); // Removed token dependency

  const editPost = async (postId) => {
    console.log(`Editing post ${postId}`);
    // Implement edit functionality here. Remember to use withCredentials for authenticated requests
  };

  const deletePost = async (postId) => {
    console.log(`Deleting post ${postId}`);
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`, {
        withCredentials: true // Ensure cookies are included with the request for authentication
      });
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {/* Conditionally render edit and delete buttons based on user session information. */}
              {/* This will require adjustments to ensure the logged-in user's ID is available for comparison. */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostsList;
