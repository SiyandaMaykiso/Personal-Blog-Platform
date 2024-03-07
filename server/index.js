require('dotenv').config();
const express = require('express');
const session = require('express-session'); // If using session-based authentication
const cors = require('cors'); // If needed for development
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Enable CORS if your client and server are on different ports during development

// Session configuration here if using express-session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Note: secure cookies should only be used over HTTPS
}));

// Import routes
const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes'); // Ensure this file implements user registration and login logic correctly

// Use routes
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes); // However, ensure that your authRoutes.js correctly implements the authentication logic, including user registration and login, as discussed in previous instructions.

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
