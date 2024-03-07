import React from 'react';
import PostsList from './PostsList'; // Component to list your posts
import CreatePost from './CreatePost'; // Component to create a new post
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Blog Platform</h1>
      </header>
      <main>
        <CreatePost /> {/* Allow users to create a new post */}
        <PostsList /> {/* Show a list of posts */}
      </main>
    </div>
  );
}

export default App;
