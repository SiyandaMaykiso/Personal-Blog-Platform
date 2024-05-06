const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
require('dotenv').config();


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id as id, username, email',
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


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = await pool.query('SELECT user_id as id, username, password FROM users WHERE username = $1', [username]);
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


router.post('/logout', (req, res) => {
  res.json({ message: "Logged out successfully, please clear your token" });
});


const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: "Unauthorized access - invalid token" });
  }
};


router.get('/session', isAuthenticated, (req, res) => {
  res.json({ isLoggedIn: true, user: req.user });
});


router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: "Access to protected route granted", user: req.user });
});

module.exports = router;
