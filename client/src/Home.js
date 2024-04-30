import React from 'react';
import Login from './Login';
import Registration from './Registration';

function Home({ onLogin, onRegistration }) {
  return (
    <div className="home-container">
      <h1>Welcome to the Personal Blog Platform</h1>
      <div className="auth-container">
        <Login onLogin={onLogin} />
        <Registration onRegistration={onRegistration} />
      </div>
    </div>
  );
}

export default Home;
