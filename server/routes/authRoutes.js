const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // Ensure this path accurately points to your DB connection setup

const saltRounds = 10;

// User registration route
router.post('/register', async (req, res) => {
  // Your existing registration code here
  // Ensure the password is hashed before storing it in the database
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
    // Correctly use the 'password' column for hash comparison
    const validPassword = await bcrypt.compare(password, user.password); // Adjusted to use 'password'
    if (!validPassword) {
      return res.status(401).json({ message: "Login failed: Incorrect password" });
    }

    // Omit the password from the user object before sending it back
    const { password: _, ...userWithoutPassword } = user; // Exclude the password

    // Implement your session or token logic here
    // e.g., req.session.user = userWithoutPassword for session-based auth
    // or return a JWT token for token-based auth

    res.json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    console.error("Server error during login:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User logout route
// Implement your logout logic here, if using sessions, destroy the session

// Other authentication routes (if any) would go here

module.exports = router;
