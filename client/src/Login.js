// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => { // Add onLogin as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });
      
      // Assuming your backend returns the user data on successful login
      if (response.data.user) {
        onLogin(response.data.user); // Update parent state
        console.log(response.data.message); // Log the successful login message
        setErrorMessage(''); // Clear any previous error messages
        // If you are using React Router, you might redirect here
        // history.push('/dashboard');
      } else {
        // Handle case where there is no user data in the response
        setErrorMessage('Login failed: No user data returned');
      }
    } catch (error) {
      // Handle case where there is an error in the request
      console.error('Login error', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username" // Correct autoComplete attribute for username
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password" // Correct autoComplete attribute for current-password
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
