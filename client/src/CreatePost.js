import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!title.trim() || !content.trim()) {
      alert('Both title and content are required.');
      return;
    }

    try {
      // Replace 'http://localhost:5000/posts' with your actual endpoint
      const response = await axios.post('http://localhost:5000/posts', { title, content });
      
      // Assuming the API returns the created post object
      console.log('Post created:', response.data);
      alert('Post created successfully!');

      // Clear the form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create the post. Please try again.');
    }
  };

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
      <button type="submit">Submit Post</button>
    </form>
  );
}

export default CreatePost;
