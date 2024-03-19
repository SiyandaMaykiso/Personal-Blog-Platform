import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        const postResponse = await axios.get(`http://localhost:3001/posts/${id}`, { withCredentials: true });
        setPost(postResponse.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setErrorMessage('Failed to fetch post details');
      }

      try {
        const commentsResponse = await axios.get(`http://localhost:3001/posts/${id}/comments`, { withCredentials: true });
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        // Only update error message if no post details were fetched to avoid overwriting more critical error messages
        if (!post) {
          setErrorMessage('Failed to fetch comments');
        }
      }
    };

    fetchPostDetails();
  }, [id]); // Re-fetch if ID changes

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:3001/posts/${id}`, { withCredentials: true });
        alert('Post deleted successfully');
        navigate('/');
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  return (
    <div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        post && (
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
        )
      )}
    </div>
  );
}

export default PostDetail;
