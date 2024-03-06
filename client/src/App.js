import React from 'react';
import PostsList from './PostsList';
import CreatePost from './CreatePost'; // Import CreatePost component
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <CreatePost /> {/* Include the CreatePost component */}
      <PostsList /> {/* PostsList component to list posts */}
    </div>
  );
}

export default App;
