import React, { useState } from 'react';
import PostsList from './PostsList'; // Component to list your posts
import CreatePost from './CreatePost'; // Component to create a new post
import Login from './Login'; // Import the Login component
import Registration from './Registration'; // Import the Registration component
import './App.css';

function App() {
  // State to track the logged-in user
  const [user, setUser] = useState(null);

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    // Here you can also clear the token from localStorage or cookies if you use them
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Blog Platform</h1>
        {/* Conditionally render logout button or login and registration based on user state */}
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Login setUser={setUser} /> {/* Pass setUser to the Login component */}
            <Registration /> {/* Registration component */}
          </>
        )}
      </header>
      <main>
        {/* Show components based on the user's logged-in state */}
        {user ? (
          <>
            <CreatePost /> {/* Allow logged-in users to create a new post */}
            <PostsList /> {/* Show a list of posts */}
          </>
        ) : (
          <p>Please log in to view posts and create new ones.</p>
        )}
      </main>
    </div>
  );
}

export default App;
