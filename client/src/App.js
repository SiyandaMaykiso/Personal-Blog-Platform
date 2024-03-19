import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import Login from './Login';
import Registration from './Registration';
import EditPost from './EditPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/session', { withCredentials: true });
        if (response.data.isLoggedIn) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Session check failed:', error);
        setUser(null);
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
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Personal Blog Platform</h1>
          {user ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <nav>
                <ul>
                  <li><a href="/create-post">Create Post</a></li>
                  <li><a href="/">View Posts</a></li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <Login onLogin={handleUserLogin} />
              <Registration onRegistration={handleUserRegistration} />
            </>
          )}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/create-post" element={user ? <CreatePost /> : <Login onLogin={handleUserLogin} />} />
            <Route path="/edit-post/:id" element={user ? <EditPost /> : <Login onLogin={handleUserLogin} />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
