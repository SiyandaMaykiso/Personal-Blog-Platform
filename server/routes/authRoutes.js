const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // Make sure this path is correct for your database connection setup

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id }, // Payload with user's ID
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: '1h' } // Token expiration time
  );
};

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

    // Generate a JWT token after successful login using the new function
    const token = generateToken(user);

    // Omit the password from the user object before sending it back
    const userWithoutPassword = { ...user, password: undefined };

    res.json({ message: "Login successful", user: userWithoutPassword, token }); // Include the token in the response
  } catch (error) {
    console.error("Server error during login:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User logout route
router.post('/logout', (req, res) => {
  // Logout functionality might be revised since JWT doesn't use server-side sessions
  res.status(200).send('Logout functionality with JWT typically involves the client deleting the stored token.');
});

module.exports = router;
