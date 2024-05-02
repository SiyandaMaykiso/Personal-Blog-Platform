import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './Home';
import PostsList from './PostsList';
import PostDetail from './PostDetail'; // Import the PostDetail component
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import Login from './Login';
import Registration from './Registration';
import './App.css';

function PrivateRoute({ children }) {
  const { authToken } = useAuth();
  return authToken ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-list" element={<PrivateRoute><PostsList /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />  // New route for PostDetail
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
