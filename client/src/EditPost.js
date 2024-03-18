import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`, {
          withCredentials: true,
        });
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post data:', error);
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
      const response = await axios.put(`http://localhost:3001/posts/${id}`, { title, content }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('Update response:', response.data);
      alert('Post updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to update post:', error);
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
