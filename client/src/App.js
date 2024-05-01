import React, { useState, useEffect } from 'react';
import axios from './services/axiosConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Directly use the token from local storage to make the initial check
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/session')
        .then(response => {
          setUser(response.data.user);
          console.log('Session validated', response.data);
        })
        .catch(error => {
          console.log('Session check failed:', error);
          setUser(null);
          localStorage.removeItem('jwtToken'); // Remove invalid or expired token
        });
    }
  }, []); // Only run once on mount

  const handleUserLogin = (authData) => {
    localStorage.setItem('jwtToken', authData.token);
    setUser(authData.user);
    // Immediately set the token for axios instance
    axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
    console.log('Token set for axios instance');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
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
