const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
require('dotenv').config();


const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access - invalid token" });
  }
};


router.get('/', isAuthenticated, async (req, res) => {
    try {
        const authorId = req.user.userId;
        const { rows } = await pool.query('SELECT * FROM posts WHERE authorId = $1', [authorId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
});


router.get('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const authorId = req.user.userId;
    try {
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1 AND authorId = $2', [id, authorId]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Post not found or unauthorized access' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch post" });
    }
});


router.post('/', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.user.userId; 
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


router.put('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = req.user.userId; 
    try {
        const { rows } = await pool.query(
            'UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND authorId = $4 RETURNING *',
            [title, content, id, authorId]
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


router.delete('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const authorId = req.user.userId; 
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM posts WHERE id = $1 AND authorId = $2',
            [id, authorId]
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
