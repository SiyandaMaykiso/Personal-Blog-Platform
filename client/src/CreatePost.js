import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Both title and content are required.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/posts', { title, content }, {
        withCredentials: true
      });
      console.log('Post created:', response.data);
      alert('Post created successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="postTitle">Post Title</label>
        <input
          id="postTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>
      <div>
        <label htmlFor="postContent">Post Content</label>
        <textarea
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Submit Post'}
      </button>
    </form>
  );
}

export default CreatePost;
