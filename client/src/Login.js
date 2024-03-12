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
      
      // If login is successful, call onLogin with the user's data
      onLogin(response.data.user);
      console.log(response.data); // Log the successful login message
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error', error.response ? error.response.data : error.message);
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
        />
        <input
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
