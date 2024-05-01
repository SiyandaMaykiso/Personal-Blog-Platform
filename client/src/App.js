import React, { useState, useEffect } from 'react';
import axios from './services/axiosConfig'; // Use your configured Axios instance that handles headers
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Configure Axios to use the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Dummy API call to check session or decode the token to fetch user data
      // For demonstration, assuming we decode token client-side
      // Ideally, you should call an API that validates the token and returns user data
      axios.get('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/session')
        .then(response => setUser(response.data.user))
        .catch(error => console.log('Session check failed:', error));
    }
  }, [token]);

  const handleUserLogin = (authData) => {
    localStorage.setItem('jwtToken', authData.token);
    setToken(authData.token);
    setUser(authData.user);
  };

  const handleUserRegistration = (authData) => {
    localStorage.setItem('jwtToken', authData.token);
    setToken(authData.token);
    setUser(authData.user);
  };

  const handleLogout = async () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
    // Logout endpoint may no longer be necessary with JWT unless you maintain a token blacklist server-side
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : null}
        <main>
          <Routes>
            <Route path="/" element={<Home onLogin={handleUserLogin} onRegistration={handleUserRegistration} />} />
            <Route path="/post-list" element={user ? <PostsList /> : <Home onLogin={handleUserLogin} onRegistration={handleUserRegistration} />} />
            <Route path="/create-post" element={user ? <CreatePost /> : <Home onLogin={handleUserLogin} onRegistration={handleUserRegistration} />} />
            <Route path="/edit-post/:id" element={user ? <EditPost /> : <Home onLogin={handleUserLogin} onRegistration={handleUserRegistration} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
