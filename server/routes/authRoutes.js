const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');
const session = require('express-session');

// Configure session middleware
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// User registration route
router.post('/register', async (req, res) => {
  // ... registration logic remains the same ...
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // ... user lookup logic remains the same ...

  if (validPassword) {
    // Set user info in session instead of sending a JWT
    req.session.user = { userId: user.id, username: user.username };
    res.json({ message: "Login successful" });
  } else {
    // ... handle failed login ...
  }
});

// User logout route
router.post('/logout', (req, res) => {
  req.session.destroy(); // Destroys the session on the server side
  res.clearCookie('connect.sid'); // Deletes the session cookie from the client
  res.json({ message: "Logged out successfully" });
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Now you use isAuthenticated middleware for routes that require auth
// Example protected route
router.get('/protected', isAuthenticated, (req, res) => {
  // If this runs, the user is authenticated
  res.json({ message: "This is a protected route." });
});

module.exports = router;
