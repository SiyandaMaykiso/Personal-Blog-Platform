function isAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
    
      res.status(401).json({ message: 'You are not authorized to view this page' });
    }
  }
  
  module.exports = isAuthenticated;
  