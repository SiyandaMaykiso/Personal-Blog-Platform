import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { fetchPost, updatePost } from './postsService'; // Ensure paths are correct

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPostDetails = async () => {
            try {
                const postDetails = await fetchPost(id);
                if (postDetails) {
                    setInitialValues({ title: postDetails.title, content: postDetails.content });
                } else {
                    setError('Post not found');
                    navigate('/post-list');
                }
            } catch (error) {
                console.error("Failed to load post details:", error);
                setError(error.message || 'An error occurred while loading the post details.');
                navigate('/post-list');
            } finally {
                setLoading(false);
            }
        };

        loadPostDetails();
    }, [id, navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await updatePost(id, values);
            navigate(`/posts/${id}`);  // Navigate to post details page after update
        } catch (error) {
            console.error("Failed to update the post:", error);
            setError(error.message || 'Failed to update the post.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Edit Post</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="title">Title</label>
                            <Field id="title" name="title" type="text" required />
                        </div>
                        <div>
                            <label htmlFor="content">Content</label>
                            <Field id="content" name="content" as="textarea" required />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditPost;
