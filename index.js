require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: [
        "'self'", 
        'https://fonts.googleapis.com', 
        "'unsafe-inline'" 
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  }
}));

app.use(compression()); 

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  if (req.accepts('html')) {
    console.log('Serving index.html for path:', req.path);
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  }
});

app.use((req, res, next) => {
  console.log('Route not found:', req.path);
  res.status(404).send('Sorry, that route does not exist.');
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
