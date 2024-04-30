const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token is used
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Token verification failed:", err);
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded; // Add the decoded user to the request object
            next();
        });
    } else {
        console.log("Unauthorized access attempt, no token provided.");
        res.status(401).json({ message: 'No token provided, authorization denied' });
    }
}

module.exports = isAuthenticated;
