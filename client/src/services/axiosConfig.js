import axios from 'axios';

// Update baseURL to point to your Heroku-hosted backend
const instance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
  withCredentials: true,
});

export default instance;
