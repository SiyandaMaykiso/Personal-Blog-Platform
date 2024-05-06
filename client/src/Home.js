import React from 'react';
import Login from './Login';
import Registration from './Registration';
import { useNavigate } from 'react-router-dom';

function Home({ onLogin, onRegistration }) {
  const navigate = useNavigate();

  const handleLogin = (userData, token) => {
    localStorage.setItem('jwtToken', token); 
    onLogin(userData); 
    navigate('/post-list'); 
  };

  const handleRegistration = (userData, token) => {
    localStorage.setItem('jwtToken', token); 
    onRegistration(userData); 
    navigate('/post-list'); 
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Personal Blog Platform</h1>
      <div className="auth-container">
        <div className="login">
          <Login onLogin={handleLogin} />
        </div>
        <div className="registration">
          <Registration onRegistration={handleRegistration} />
        </div>
      </div>
    </div>
  );
}

export default Home;
