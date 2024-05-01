import axios from 'axios';
import { getToken } from './tokenService';  // Adjust the path as necessary

const axiosInstance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
});

// Use an interceptor to attach the token to every request and log detailed token information
axiosInstance.interceptors.request.use(function (config) {
  const token = getToken();  // Use the utility function to get the token
  console.log('Retrieved token from storage:', token);  // Log the token retrieved from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization Header set:', config.headers.Authorization);  // Confirm header setting
  } else {
    delete config.headers.Authorization;  // Clear Authorization header if no token
    console.log('No Authorization Header, token not available.');
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;
