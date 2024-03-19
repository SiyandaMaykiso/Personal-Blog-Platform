require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const cors = require('cors');
const path = require('path');
const isAuthenticated = require('./middleware/isAuthenticated');
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
}));

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/posts', isAuthenticated, postsRoutes);
app.use('/auth', authRoutes);


app.use(express.static(path.join(__dirname, '../client/build')));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

app.use((err, req, res, next) => {
  console.error("Error status: ", err.status || 500);
  console.error("Error message: ", err.message);
  console.error("Error stack: ", err.stack);
  res.status(err.status || 500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
