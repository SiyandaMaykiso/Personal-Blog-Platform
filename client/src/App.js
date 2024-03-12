import React, { useState } from 'react';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import Login from './Login';
import Registration from './Registration';
import './App.css';

function App() {
  // State to track the logged-in user
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleUserLogin = (userData) => {
    setUser(userData);
    // Also store the user data in localStorage or manage a session here if needed
  };

  // Function to handle user registration
  const handleUserRegistration = (userData) => {
    // You can set the user directly or redirect to the login page to login with the new credentials
    setUser(userData);
    // You may also want to store the user data or a registration confirmation here
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    // Here you should also clear the user data from localStorage or cookies if you use them
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Blog Platform</h1>
        {user ? (
          // If user is logged in, show logout button
          <button onClick={handleLogout}>Logout</button>
        ) : (
          // If no user is logged in, show login and registration forms
          <>
            <Login onLogin={handleUserLogin} />
            <Registration onRegistration={handleUserRegistration} />
          </>
        )}
      </header>
      <main>
        {user ? (
          // If user is logged in, allow them to create posts and view the list
          <>
            <CreatePost />
            <PostsList />
          </>
        ) : (
          // If no user is logged in, prompt them to log in
          <p>Please log in to view posts and create new ones.</p>
        )}
      </main>
    </div>
  );
}

export default App;
