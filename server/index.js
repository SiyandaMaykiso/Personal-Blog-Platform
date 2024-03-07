require('dotenv').config();
const express = require('express');
const session = require('express-session'); // If using session-based authentication
const cors = require('cors'); // If needed for development
const isAuthenticated = require('./middleware/isAuthenticated'); // Import the authentication middleware
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Enable CORS if your client and server are on different ports during development

// Session configuration here if using express-session
app.use(session({
  secret: process.env.SESSION_SECRET, // Use an environment variable for the secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Note: secure cookies should only be used over HTTPS
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
