require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 3001;

// CORS options to dynamically handle development and production environments
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://personal-blog-platform-a11db04dd963.herokuapp.com' : 'http://localhost:3000',
  credentials: true, // Must be true to accept cookies via AJAX requests
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet()); // Set security-related HTTP headers
app.use(compression()); // Compress all routes

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/posts', postsRoutes); // Assume JWT authentication is handled in the routes themselves
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Improved error handling for production
app.use((err, req, res, next) => {
  console.error("Error status: ", err.status || 500);
  console.error("Error message: ", err.message);
  if (process.env.NODE_ENV === 'production') {
    res.status(err.status || 500).send('Something went wrong');
  } else {
    console.error("Error stack: ", err.stack);
    res.status(err.status || 500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
