function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next(); // If session exists and user is set, proceed to the next middleware/function
    } else {
      res.status(401).send('You are not authorized to view this page');
    }
  }
  
  module.exports = isAuthenticated;
  