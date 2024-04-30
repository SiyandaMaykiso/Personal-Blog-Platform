import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Both title and content are required.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://personal-blog-platform-a11db04dd963.herokuapp.com/posts', { title, content }, {
        withCredentials: true
      });
      console.log('Post created:', response.data);
      alert('Post created successfully!');
      setTitle('');
      setContent('');
      navigate('/posts'); // Navigate to posts page after successful creation
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to navigate to the posts list page
  const handleViewPosts = () => {
    navigate('/post-list');
  };

  // Optionally, add more navigation functions if there are other specific pages to navigate to

  return (
    <div>
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
      <button onClick={handleViewPosts}>View Posts</button> {/* Navigation button */}
    </div>
  );
}

export default CreatePost;
