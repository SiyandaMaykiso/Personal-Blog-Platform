import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; 

const CreatePost = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!authToken) {
      console.error('Token not found');
      setSubmissionError('Authentication required. Please log in.');
      setIsSubmitting(false);
      return;
    }

    if (!title || !content) {
      setSubmissionError('Both title and content are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://personal-blog-platform-a11db04dd963.herokuapp.com/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create post');
      }

      const result = await response.json();
      setSuccessMessage('Post created successfully!');
      setTitle('');
      setContent('');
      navigate('/post-list'); // Navigate to posts list page after successful creation
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToPosts = () => {
    navigate('/post-list'); // Navigate back to the post list
  };

  return (
    <div className="post-form-container container">
      <h2>Add New Post</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-control">
        <label htmlFor="title">Title</label>
<input
    className="title-input"  // Add this class
    id="title"
    name="title"
    placeholder="Enter post title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
/>
        </div>
        <div className="form-control">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {submissionError && <div className="error-message">{submissionError}</div>}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? 'Creating...' : 'Submit Post'}
        </button>
        <button type="button" onClick={handleNavigateToPosts} className="btn btn-secondary">
          Back to Posts
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
