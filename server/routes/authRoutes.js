const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // Adjust the path as necessary to import your database connection

const saltRounds = 10;

// User registration route
router.post('/register', async (req, res) => {
  // Existing registration code...
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Destructure the request body

  try {
    // Look for the user in the database by username
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: "Login failed: User not found" });
    }

    const user = userQuery.rows[0];

    // Compare the provided password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Login failed: Incorrect password" });
    }

    // Omit the password from the user object before sending it back
    const { password: _, ...userWithoutPassword } = user;

    res.json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// User logout route
// ... existing logout code ...

// Other authentication routes (if any) would go here

module.exports = router;
