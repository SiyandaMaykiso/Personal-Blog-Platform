const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Adjust path as necessary

// Mock data for demonstration
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post', authorId: 'userId1' },
    { id: 2, title: 'Second Post', content: 'This is the second post', authorId: 'userId2' },
];

// Apply the verifyToken middleware to routes that require authentication
router.get('/', verifyToken, (req, res) => {
    res.json(posts);
});

router.get('/:id', verifyToken, (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

router.post('/', verifyToken, (req, res) => {
    // Example of creating a new post with authorId
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        authorId: req.userId // Assuming the verifyToken middleware sets req.userId
    };
    posts.push(newPost);
    res.status(201).send(newPost);
});

router.put('/:id', verifyToken, (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1 && posts[index].authorId === req.userId) { // Check authorship
        posts[index] = { ...posts[index], ...req.body };
        res.send(posts[index]);
    } else {
        res.status(403).send('Not authorized to edit this post');
    }
});

router.delete('/:id', verifyToken, (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1 && posts[index].authorId === req.userId) { // Check authorship
        posts = posts.filter(p => p.id !== parseInt(req.params.id));
        res.send('Post deleted');
    } else {
        res.status(403).send('Not authorized to delete this post');
    }
});

module.exports = router;
