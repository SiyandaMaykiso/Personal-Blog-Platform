import React from 'react';
import Login from './Login';
import Registration from './Registration';

function Home({ onLogin, onRegistration }) {
  return (
    <div className="home-container">
      <h1>Welcome to Personal Blog Platform</h1>
      <div className="authentication-container">
        <div className="login">
          <Login onLogin={onLogin} />
        </div>
        <div className="registration">
          <Registration onRegistration={onRegistration} />
        </div>
      </div>
    </div>
  );
}

export default Home;
