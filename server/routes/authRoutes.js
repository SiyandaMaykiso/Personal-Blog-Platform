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
  try {
    const { username, password } = req.body; // Destructure the request body

    // Look for the user in the database by username
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userQuery.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = userQuery.rows[0];

    // Compare the provided password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Here you would typically set up a session or generate a token
    // For this example, we'll just return a success message
    // Remember to replace this with your actual session or token logic
    res.json({ message: "Logged in successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error during login');
  }
});

// User logout route
router.post('/logout', (req, res) => {
    if (req.session) {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error("Error during logout:", err);
                return res.status(500).send('Error during logout');
            }
            // Optionally clear the cookie if you're using one for session handling
            res.clearCookie('connect.sid'); // Adjust this if your cookie name is different
            res.json({ message: "Logged out successfully" });
        });
    } else {
        // No session exists, perhaps the user was not logged in to begin with
        res.status(400).send('No session found or user not logged in');
    }
});

// Other authentication routes (logout) would go here

module.exports = router;
