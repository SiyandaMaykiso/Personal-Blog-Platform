import axios from 'axios';
import { getToken } from './tokenService'; // Ensure this path is correctly pointing to where your token retrieval function is defined

const axiosInstance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();  // Retrieve the JWT token from your authentication service or local storage
    console.log('Intercepted token:', token); // Optional: logs the token on each request for debugging purposes
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Ensure no Authorization header is sent if no token is present
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
