require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Import the posts routes
const postsRoutes = require('./routes/postsRoutes');

// Use the posts routes for any requests that go to '/posts'
app.use('/posts', postsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
