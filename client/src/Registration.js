import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ onRegistration }) => {
  // Define the state variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    try {
      // Perform the registration request
      const response = await axios.post('http://localhost:3001/auth/register', {
        username,
        email,
        password,
      });

      // Assuming the API returns the new user object
      console.log('User registered:', response.data);
      setErrorMessage(''); // Clear any previous error messages

      // If the onRegistration function is provided, call it
      if (onRegistration) {
        onRegistration(response.data);
      }

      // Redirect the user or perform any other actions upon successful registration
    } catch (error) {
      // Handle any errors during the registration process
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
