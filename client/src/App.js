import React, { useState, useEffect } from 'react';
import axios from './services/axiosConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setToken, getToken, removeToken } from './services/tokenService'; // Import token utilities
import Home from './Home';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/session')
        .then(response => {
          setUser(response.data.user);
          console.log('Session validated', response.data);
        })
        .catch(error => {
          console.log('Session check failed:', error);
          setUser(null);
          removeToken(); // Remove invalid or expired token using utility
        });
    }
  }, []); // Only run once on mount

  const handleUserLogin = (authData) => {
    setToken(authData.token); // Use utility to set token
    setUser(authData.user);
  };

  const handleLogout = () => {
    removeToken(); // Use utility to remove token
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {user ? <button onClick={handleLogout}>Logout</button> : null}
        <main>
          <Routes>
            <Route path="/" element={<Home onLogin={handleUserLogin} />} />
            <Route path="/post-list" element={user ? <PostsList /> : <Home onLogin={handleUserLogin} />} />
            <Route path="/create-post" element={user ? <CreatePost /> : <Home onLogin={handleUserLogin} />} />
            <Route path="/edit-post/:id" element={user ? <EditPost /> : <Home onLogin={handleUserLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
