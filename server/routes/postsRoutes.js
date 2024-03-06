const express = require('express');
const router = express.Router();

// Mock data for demonstration
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', content: 'This is the second post' },
];

// Get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// Get a single post by ID
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

// Create a new post
router.post('/', (req, res) => {
    // For a real application, you would validate input and potentially generate a unique ID
    const newPost = {
        id: posts.length + 1, // Simplistic approach for ID
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.status(201).send(newPost);
});

// Update an existing post
router.put('/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        posts[index] = { ...posts[index], ...req.body };
        res.send(posts[index]);
    } else {
        res.status(404).send('Post not found');
    }
});

// Delete a post
router.delete('/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        posts = posts.filter(p => p.id !== parseInt(req.params.id));
        res.send('Post deleted');
    } else {
        res.status(404).send('Post not found');
    }
});

module.exports = router;
