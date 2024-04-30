import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost } from './postsService';  // Assuming fetchPost is available for fetching single post

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetails = async () => {
            setLoading(true);
            try {
                const postDetails = await fetchPost(id);  // Fetch single post detail
                if (postDetails) {
                    setTitle(postDetails.title);
                    setContent(postDetails.content);
                } else {
                    console.error("Post not found");
                    navigate('/post-list');  // Redirect to the list if post is not found
                }
            } catch (error) {
                console.error("Failed to load post details:", error);
                navigate('/post-list');  // Redirect on error
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updatePost(id, { title, content });
            navigate(`/posts/${id}`);  // Navigate to post details page after update
        } catch (error) {
            console.error("Failed to update the post:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>Save Changes</button>
        </form>
    );
}

export default EditPost;
