import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);
  // Retrieve the token and user information from localStorage
  const token = localStorage.getItem('token');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Ensure the request includes the Authorization header
        const response = await axios.get('http://localhost:3001/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [token]); // Depend on the token to refetch when it changes

  const editPost = async (postId) => {
    // Placeholder for edit functionality
    console.log(`Editing post ${postId}`);
    // Implement edit logic here
  };

  const deletePost = async (postId) => {
    // Placeholder for delete functionality
    console.log(`Deleting post ${postId}`);
    try {
      // Use the token in the Authorization header to authenticate the request
      await axios.delete(`http://localhost:3001/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the posts state to reflect the deletion
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
              {/* Render edit and delete buttons only for the author of the post */}
              {loggedInUser && post.authorId === loggedInUser.userId && (
                <div>
                  <button onClick={() => editPost(post.id)}>Edit</button>
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              )}
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
