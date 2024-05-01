import React, { useState, useEffect } from 'react';
import axios from './services/axiosConfig'; // Use your configured Axios instance that handles headers
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    if (token) {
      // Delay the session check slightly to ensure local storage has updated
      setTimeout(() => {
        axios.get('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/session')
          .then(response => {
            setUser(response.data.user);
            console.log('Session validated', response.data);
          })
          .catch(error => {
            console.log('Session check failed:', error);
            setUser(null);
            setToken(null);
            localStorage.removeItem('jwtToken'); // Remove invalid or expired token
          });
      }, 100); // Delay of 100 milliseconds
    }
  }, [token]); // Dependency array includes token to trigger effect when it changes

  const handleUserLogin = (authData) => {
    localStorage.setItem('jwtToken', authData.token);
    console.log('Token set in local storage:', localStorage.getItem('jwtToken')); // Confirm token is set
    setTimeout(() => {
      setToken(authData.token); // Set token in state to trigger useEffect after a brief delay
      setUser(authData.user);
    }, 100); // Wait 100ms to update state to ensure localStorage is synced
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : null}
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
