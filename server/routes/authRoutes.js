const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // Make sure this path is correct for your database connection setup

// Assuming your user's table column for the hashed password is named 'password'

// User registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    const userWithoutPassword = { ...newUser.rows[0], password: undefined };
    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
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
    if (!validPassword) {
      return res.status(401).json({ message: "Login failed: Incorrect password" });
    }

    // Omit the password from the user object before sending it back
    const userWithoutPassword = { ...user, password: undefined };

    // Set the user object in the session
    req.session.user = userWithoutPassword;

    res.json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    console.error("Server error during login:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User logout route
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).send('Error during logout');
      }
      res.clearCookie('connect.sid'); // Adjust this if your session cookie name is different
      res.json({ message: "Logged out successfully" });
    });
  } else {
    res.status(400).send('No session found or user not logged in');
  }
});

module.exports = router;
