import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialized for post-update redirection

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`, {
          withCredentials: true
        });
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post data:', error);
        alert('Failed to fetch post data. Please try again.');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Both title and content are required.');
      return;
    }

    try {
      await axios.put(`http://localhost:3001/posts/${id}`, { title, content }, {
        withCredentials: true
      });
      alert('Post updated successfully!');
      navigate('/'); // Redirect to the home page or list of posts after successful update
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('Failed to update the post. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
      />
      <button type="submit">Update Post</button>
    </form>
  );
}

export default EditPost;
