const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const user = newUser.rows[0];
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ message: "User registered successfully", user, token });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "Login failed: User not found" });
    }

    const user = userQuery.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ message: "Login successful", user: { userId: user.id, username: user.username }, token });
    } else {
      res.status(401).json({ message: "Login failed: Incorrect password" });
    }
  } catch (error) {
    console.error("Server error during login:", error.message);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
});

// User logout
router.post('/logout', (req, res) => {
  // Logout for JWT is handled client-side by removing the token
  res.json({ message: "Logged out successfully, please clear your token" });
});

// Middleware to check if the user is authenticated using JWT
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assume Bearer token
  console.log('Received token:', token);  // Log the received token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token is valid, decoded payload:', decoded);  // Log the successful decoding
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);  // Log the error if verification fails
    res.status(401).json({ message: "Unauthorized access - invalid token" });
  }
};

// Check token validity
router.get('/session', isAuthenticated, (req, res) => {
  console.log('Token decoded successfully:', req.user);  // Log the decoded user information
  res.json({ isLoggedIn: true, user: req.user });
});

// Example protected route
router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: "Access to protected route granted", user: req.user });
});

module.exports = router;
