import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      }, {
        withCredentials: true // Ensure cookies are included with the request
      });

      // Check if the response includes a token
      if (response.data.token) {
        // Save the token in localStorage
        localStorage.setItem('token', response.data.token);
        // Optionally save user info if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Set the default authorization header for subsequent Axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        onLogin(response.data.user); // Update parent component state or perform further actions
        console.log('Login successful:', response.data.message);
        setErrorMessage(''); // Clear any error messages
      } else {
        setErrorMessage('Login failed: No user data or token returned.');
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
          id="password"
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
