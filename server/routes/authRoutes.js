const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // Make sure this path is correct for your setup
require('dotenv').config(); // To access environment variables

// ... Your existing code for register, login, and logout ...

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// New route to check the current user session
router.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    // If there is a user in session, respond that the user is logged in
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    // If there is no user in session, respond that the user is not logged in
    res.json({ isLoggedIn: false });
  }
});

// Example protected route
router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.session.user });
});

module.exports = router;
