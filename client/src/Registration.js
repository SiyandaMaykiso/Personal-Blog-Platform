// Registration.js
import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ onRegistration }) => { // Accept the onRegistration prop
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    
    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        email,
        password,
      });
      
      // Assuming the API returns the new user object
      console.log('User registered:', response.data);
      setErrorMessage(''); // Clear any previous error messages
      
      if (onRegistration) {
        onRegistration(response.data); // Call the onRegistration function with the user data
      }
      
      // Redirect to login or direct login after registration
      // window.location.href = '/login';
    } catch (error) {
      console.error('Error', error.response ? error.response.data : error.message);
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
