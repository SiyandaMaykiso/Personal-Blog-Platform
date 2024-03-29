import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, updatePost } from './postsService';

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
                const allPosts = await fetchPosts();
                const postDetails = allPosts.find(post => post.id.toString() === id);
                if (postDetails) {
                    setTitle(postDetails.title);
                    setContent(postDetails.content);
                } else {
                    console.error("Post not found");
                    navigate('/');
                }
            } catch (error) {
                console.error("Failed to load post details:", error);
                navigate('/');
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
            navigate(`/posts/${id}`);
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
