import React, { useState } from 'react';
import axios from './services/axiosConfig';  // Make sure to import your configured Axios instance
import { setToken } from './services/tokenService'; // assuming you have a utility for setting tokens

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });

      console.log("Login response:", response.data);  // Check what the server actually returns, including the token

      if (response.data.token) {
        setToken(response.data.token);  // Use your token service to handle setting the token
        console.log('Token set in local storage:', localStorage.getItem('jwtToken'));  // Log the token from local storage right after setting it

        onLogin(response.data.user);  // Update the user state in your app
        console.log('Login successful:', response.data.message);
        console.log('Token received:', response.data.token);  // Specifically log the token
        setErrorMessage('');
      } else {
        setErrorMessage('Login failed: No user data returned.');
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in');
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
