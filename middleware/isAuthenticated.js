function isAuthenticated(req, res, next) {
  console.log("Checking authentication, session:", req.session);
  if (req.session.user) {
      next();
  } else {
      console.log("Unauthorized access attempt, no user found in session.");
      res.status(401).json({ message: 'You are not authorized to view this page' });
  }
}
  module.exports = isAuthenticated;
  