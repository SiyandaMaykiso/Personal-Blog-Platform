require('dotenv').config();
const express = require('express');
const session = require('express-session'); // If using session-based authentication
const cors = require('cors'); // If needed for development
const isAuthenticated = require('./middleware/isAuthenticated'); // Import the authentication middleware
const app = express();
const PORT = process.env.PORT || 3001;

// Specify origin and credentials for CORS
const corsOptions = {
  origin: 'http://localhost:3000', // This should match the URL of your frontend application
  credentials: true, // This allows session cookies to be sent back and forth
};

app.use(express.json());
app.use(cors(corsOptions)); // Updated to use corsOptions

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Changed to false for uninitialized sessions
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
}));

// Import routes
const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/posts', isAuthenticated, postsRoutes); // Protect the posts routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error status: ", err.status || 500);
  console.error("Error message: ", err.message);
  console.error("Error stack: ", err.stack);
  res.status(err.status || 500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
