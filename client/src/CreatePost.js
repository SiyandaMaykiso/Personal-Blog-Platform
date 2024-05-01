import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Ensure path is correct

const CreatePost = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!authToken) {
      console.error('Token not found');
      setSubmissionError('Authentication required. Please log in.');
      setSubmitting(false);
      return;
    }

    if (!values.title || !values.content) {
      setSubmissionError('Both title and content are required.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://personal-blog-platform-a11db04dd963.herokuapp.com/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create post');
      }

      const result = await response.json();
      setSuccessMessage('Post created successfully!');
      resetForm({});
      navigate('/post-list'); // Navigate to posts list page after successful creation
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="post-form-container container">
      <h2>Add New Post</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="Enter post title" />
            </div>
            <div className="form-control">
              <label htmlFor="content">Content</label>
              <Field id="content" name="content" as="textarea" placeholder="What's on your mind?" />
            </div>
            {submissionError && <div className="error-message">{submissionError}</div>}
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? 'Creating...' : 'Submit Post'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;
