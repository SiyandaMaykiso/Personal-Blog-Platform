import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);
  // Assuming you store the logged-in user's information and token in localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', {
          withCredentials: true,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editPost = async (postId) => {
    console.log(`Editing post ${postId}`);
    // Placeholder for edit functionality
    // You would likely open a modal or redirect to a form page
  };

  const deletePost = async (postId) => {
    console.log(`Deleting post ${postId}`);
    try {
      await axios.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post.id !== postId));
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
              {/* Conditional rendering for edit and delete options */}
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
