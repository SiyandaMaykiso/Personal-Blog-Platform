const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const pool = require('../db'); // Assuming you have a db.js that exports a Pool instance

// Fetch all posts
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
});

// Fetch a single post by id
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch post" });
    }
});

// Create a new post
router.post('/', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.session.user.userId; // Assuming session contains user ID
    try {
        const { rows } = await pool.query(
            'INSERT INTO posts (title, content, authorId) VALUES ($1, $2, $3) RETURNING *',
            [title, content, authorId]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post" });
    }
});

// Update a post
router.put('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND authorId = $4 RETURNING *',
            [title, content, id, req.session.user.userId]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Post not found or not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update post" });
    }
});

// Delete a post
router.delete('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM posts WHERE id = $1 AND authorId = $2',
            [id, req.session.user.userId]
        );
        if (rowCount > 0) {
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found or not authorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete post" });
    }
});

module.exports = router;
