import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ onRegistration }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        email,
        password,
      });

  
      console.log('User registered:', response.data);
      setErrorMessage('');

    
      if (onRegistration) {
        onRegistration(response.data);
      }

  
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
          id="register-username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
