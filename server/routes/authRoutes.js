const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // Adjust the path as necessary to import your database connection

const saltRounds = 10;

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure the request body
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
    
    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', 
      [username, email, hashedPassword]
    );
    
    // Send back the newly created user data, excluding the password
    const { password: _, ...userData } = newUser.rows[0];
    res.status(201).json({
      message: 'User registered successfully',
      user: userData
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error registering new user');
  }
});

// Other authentication routes (login, logout) would go here

module.exports = router;
