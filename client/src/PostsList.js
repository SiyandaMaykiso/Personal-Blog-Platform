import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost } from './postsService'; // Corrected imports

function PostsList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Directly call fetchPosts without referencing postsService
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      // Directly call deletePost without referencing postsService
      await deletePost(postId);
      // Update the state to reflect the deletion
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
