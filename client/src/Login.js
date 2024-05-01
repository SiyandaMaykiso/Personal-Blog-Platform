import React, { useState } from 'react';
import axios from './services/axiosConfig';  // Make sure to import your configured Axios instance
import { setToken } from './services/tokenService';  // Import setToken from tokenService

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      if (response.data.token) {
        setToken(response.data.token); // This should now be synchronous if possible
        setTimeout(() => { // Ensure token is set before proceeding
          onLogin(response.data.user);
          console.log('Login successful:', response.data.message);
        }, 500); // Test with a delay to rule out async storage issues
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
