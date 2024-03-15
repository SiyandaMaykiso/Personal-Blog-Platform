const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');
require('dotenv').config();

// User registration route
router.post('/register', async (req, res) => {
  // Implement registration logic here
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: "Login failed: User not found" });
    }

    const user = userQuery.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      req.session.user = { userId: user.id, username: user.username };
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed: Incorrect password" });
    }
  } catch (error) {
    console.error("Server error during login:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Could not log out, please try again" });
    }
    res.clearCookie('connect.sid'); // Ensure this matches the name of your session cookie
    res.json({ message: "Logged out successfully" });
  });
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Route to check the current user session
router.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Protected route example
router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.session.user });
});

module.exports = router;
