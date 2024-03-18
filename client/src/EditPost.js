import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // If you're using React Router

function EditPost() {
  const { id } = useParams(); // Assuming you're using React Router to pass the post ID
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`, {
          withCredentials: true
        });
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false); // Set loading to false after the data is loaded
        console.log('Fetched post data:', response.data); // Log the fetched post data
      } catch (error) {
        console.error('Failed to fetch post data:', error);
        alert('Failed to fetch post data. Please try again.');
      }
    };

    fetchPost();
  }, [id]);

  console.log('Title:', title, 'Content:', content); // Log the current title and content state

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
      console.log('Post updated successfully');
      alert('Post updated successfully!');
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
