// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    
    try {
      // Replace 'http://localhost:3001/auth/register' with your actual registration endpoint
      const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        email,
        password,
      });
      
      console.log(response.data); // Handle response
      setErrorMessage(''); // Clear any previous error messages
      
      // Perform any actions following successful registration, such as redirecting the user
    } catch (error) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx, or an error occurred during the request
      console.log('Error', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
