import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // Ensure cookies are sent with each request
});

export default instance;
