// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include credentials in the Axios request
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      }, {
        withCredentials: true // This will ensure cookies are included with the request
      });

      // If login is successful, call onLogin with the user's data
      if (response.data.user) {
        onLogin(response.data.user); // This function should update the parent component's state
        console.log('Login successful:', response.data.message);
        setErrorMessage(''); // Clear any error messages
        // Redirect user or update UI based on your app's flow
      } else {
        // Handle cases where login is not successful but no server error occurred
        setErrorMessage('Login failed: No user data returned.');
      }
    } catch (error) {
      // Handle cases where an error occurred during the request
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
          autoComplete="username" // Helps with auto-filling the username
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password" // Helps with auto-filling the password
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
