import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import Login from './Login';
import Registration from './Registration';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optionally, check session status on app load/reload
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/session', { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log('Session check failed:', error);
      }
    };

    checkSession();
  }, []);

  const handleUserLogin = (userData) => {
    setUser(userData);
  };

  const handleUserRegistration = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
      setUser(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Blog Platform</h1>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Login onLogin={handleUserLogin} />
            <Registration onRegistration={handleUserRegistration} />
          </>
        )}
      </header>
      <main>
        {user ? (
          <>
            <CreatePost />
            <PostsList />
          </>
        ) : (
          <p>Please log in to view posts and create new ones.</p>
        )}
      </main>
    </div>
  );
}

export default App;
