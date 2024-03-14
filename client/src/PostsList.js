import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);
  // Assuming you store the logged-in user's information in localStorage under 'user'
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', { withCredentials: true });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Placeholder functions for edit and delete functionality
  const editPost = (postId) => {
    console.log(`Editing post ${postId}`);
    // Implement editing logic here
  };

  const deletePost = (postId) => {
    console.log(`Deleting post ${postId}`);
    // Implement deletion logic here
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
              {/* Conditional rendering for edit and delete options */}
              {loggedInUser && post.authorId === loggedInUser.userId && (
                <>
                  <button onClick={() => editPost(post.id)}>Edit</button>
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </>
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
