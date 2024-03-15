const jwt = require('jsonwebtoken');

// Middleware function to verify JWT tokens
const verifyToken = (req, res, next) => {
  // Extract the token from the request's authorization header
  // Typically, the header is "Authorization: Bearer TOKEN"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part

  // Your JWT secret (ensure this is securely stored and accessed)
  const JWT_SECRET = process.env.JWT_SECRET || "your_fallback_secret_here"; // Fallback secret for demonstration; use environment variable in production

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // If token verification fails, return an unauthorized status
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // If token is valid, attach the decoded user payload to the request object
    req.user = decoded;

    // Proceed to the next middleware function or route handler
    next();
  });
};

module.exports = verifyToken;
