import axios from 'axios';
import { getToken } from './tokenService'; // Make sure this import path is correct

const axiosInstance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();  // Retrieve token using the centralized function
    console.log('Intercepted token:', token); // This log will confirm the token retrieval at request time
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
