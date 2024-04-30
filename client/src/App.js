import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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

  return (
    <Router>
      <div className="App">
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
