const jwt = require('jsonwebtoken');

// Example JWT token (replace with your actual token)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxMDQ1Mzg0NywiZXhwIjoxNzEwNDU3NDQ3fQ.dxIa6U4dVQShADyB6uTStQ8eazSIvnIMABxbth9Y2i0";

// Your JWT secret (replace with your actual JWT secret)
const JWT_SECRET = "99ca849e6d025b8ac70cde30721209b2eb6e78835f725287b46ffdd48e7a51faf591b175296d077625486dc7e3d32c24ea485eb2510c095a5e43d00acf061772";

jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    console.error("Token verification failed:", err);
  } else {
    console.log("Token is valid. Decoded payload:", decoded);
  }
});
