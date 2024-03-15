import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory along with useParams

function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL
  const history = useHistory(); // Initialize useHistory to navigate after deletion
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`, {
          withCredentials: true // Use session-based authentication instead of JWT
        });
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setErrorMessage('Failed to fetch post');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}/comments`, {
          withCredentials: true // Use session-based authentication instead of JWT
        });
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setErrorMessage('Failed to fetch comments');
      }
    };

    fetchPost();
    fetchComments();
  }, [id]); // Refetch when the post ID changes

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:3001/posts/${id}`, {
          withCredentials: true
        });
        alert('Post deleted successfully');
        history.push('/'); // Redirect to the home page or wherever you list posts
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Render author and date info if available */}
          <button onClick={deletePost}>Delete Post</button> {/* Add the delete button */}
          <h3>Comments</h3>
          <ul>
            {comments.length ? (
              comments.map((comment) => (
                <li key={comment.id}>{comment.text} {/* Render other comment details */}</li>
              ))
            ) : (
              <p>No comments found.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
}

export default PostDetail;
