const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated'); // Ensure this path is correctly relative to your file structure

// Mock data for demonstration
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post', authorId: 'userId1' },
    { id: 2, title: 'Second Post', content: 'This is the second post', authorId: 'userId2' },
];

// Apply the isAuthenticated middleware to routes that require authentication
router.get('/', isAuthenticated, (req, res) => {
    res.json(posts);
});

router.get('/:id', isAuthenticated, (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

router.post('/', isAuthenticated, (req, res) => {
    // Example of creating a new post with the authorId from session
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        authorId: req.session.user.userId // Retrieve userId from session
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

router.put('/:id', isAuthenticated, (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1 && posts[index].authorId === req.session.user.userId) { // Check authorship from session
        posts[index] = { ...posts[index], ...req.body };
        res.json(posts[index]);
    } else {
        res.status(403).json({ message: 'Not authorized to edit this post' });
    }
});

router.delete('/:id', isAuthenticated, (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1 && posts[index].authorId === req.session.user.userId) { // Check authorship from session
        posts = posts.filter(p => p.id !== parseInt(req.params.id));
        res.json({ message: 'Post deleted' });
    } else {
        res.status(403).json({ message: 'Not authorized to delete this post' });
    }
});

module.exports = router;
