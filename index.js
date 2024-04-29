require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const isAuthenticated = require('./middleware/isAuthenticated');
const app = express();
const PORT = process.env.PORT || 3001;

// CORS options to dynamically handle development and production environments
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://personal-blog-platform-a11db04dd963.herokuapp.com' : 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());  // Set security-related HTTP headers
app.use(compression());  // Compress all routes

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Ensures cookies are sent over HTTPS in production
    httpOnly: true,  // Prevents client-side JS from reading the cookie
    sameSite: 'lax',  // CSRF protection
  },
}));

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/posts', isAuthenticated, postsRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Improved error handling for production
app.use((err, req, res, next) => {
  console.error("Error status: ", err.status || 500);
  console.error("Error message: ", err.message);
  if (process.env.NODE_ENV === 'production') {
    res.status(err.status || 500).send('Something went wrong');
  } else {
    console.error("Error stack: ", err.stack);
    res.status(err.status || 500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
