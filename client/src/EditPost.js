import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from './postsService'; // Ensure paths are correct
import { useAuth } from './contexts/AuthContext'; // Ensure path is correct

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getAuthHeader } = useAuth(); // Use the AuthContext
    const [post, setPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPostDetails = async () => {
            try {
                const postDetails = await fetchPost(id, getAuthHeader);
                if (postDetails) {
                    setPost({ title: postDetails.title, content: postDetails.content });
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
    }, [id, navigate, getAuthHeader]); // Include getAuthHeader in dependencies

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await updatePost(id, post, getAuthHeader);
            navigate(`/post-detail/${id}`);  // Navigate to post details page after update
        } catch (error) {
            console.error("Failed to update the post:", error);
            setError(error.message || 'Failed to update the post.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" value={post.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" value={post.content} onChange={handleChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default EditPost;