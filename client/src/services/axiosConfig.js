import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
});

// Use an interceptor to attach the token to every request and log the Authorization header
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization Header:', config.headers.Authorization);  // Log the Authorization header
  } else {
    delete config.headers.Authorization;  // Ensure no Authorization header is sent if no token is available
    console.log('No Authorization Header, token not available.');
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;
