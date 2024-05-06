import axios from 'axios';
import { getToken } from './tokenService'; 

const axiosInstance = axios.create({
  baseURL: 'https://personal-blog-platform-a11db04dd963.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken(); 
    console.log('Intercepted token:', token); 
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
