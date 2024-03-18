import React, { useState, useEffect } from 'react';
import postsService from './postsService'; // Ensure this is the correct path to your service
import { useNavigate } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // For programmatically navigating

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postsService.fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    console.log(`Deleting post ${postId}`);
    try {
      await postsService.deletePost(postId);
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const editPost = (postId) => {
    navigate(`/edit-post/${postId}`); // Navigate to the edit page
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
              <div>
                <button onClick={() => editPost(post.id)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
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
