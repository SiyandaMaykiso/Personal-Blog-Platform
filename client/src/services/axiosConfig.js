import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
});

// Use an interceptor to attach the token to every request and log the config
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwtToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  console.log('Sending request with config:', config);  // Log the request configuration
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;
