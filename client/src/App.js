import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    const checkSession = async () => {
      try {
        const response = await axios.get('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/session', { withCredentials: true });
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
      await axios.post('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/logout', {}, { withCredentials: true });
      setUser(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
            <Route path="/post-list/:id" element={user ? <PostDetail /> : <Home onLogin={handleUserLogin} onRegistration={handleUserRegistration} />} />  {/* New route for PostDetail */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
