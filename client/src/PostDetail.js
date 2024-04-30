import React, { useState, useEffect } from 'react';
import axios from './services/axiosConfig'; // Import custom axios instance
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await axios.get(`/posts/${id}`);
        setPost(postResponse.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setErrorMessage('Failed to fetch post details');
      }

      try {
        const commentsResponse = await axios.get(`/posts/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        if (!post) {
          setErrorMessage('Failed to fetch comments');
        }
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/posts/${id}`);
        alert('Post deleted successfully');
        navigate('/');
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => navigate(`/edit-post/${id}`)}>Edit Post</button>
          <button onClick={handleDelete}>Delete Post</button>
          {comments.length > 0 && (
            <>
              <h3>Comments</h3>
              <ul>
                {comments.map(comment => (
                  <li key={comment.id}>{comment.text}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default PostDetail;
