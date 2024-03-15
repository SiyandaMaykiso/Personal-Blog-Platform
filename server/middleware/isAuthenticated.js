function isAuthenticated(req, res, next) {
    if (req.session.user) {
      next(); // If session exists and user is set, proceed to the next middleware/function
    } else {
      // Respond with a JSON message instead of plain text
      res.status(401).json({ message: 'You are not authorized to view this page' });
    }
  }
  
  module.exports = isAuthenticated;
  