import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setCurrentUser(storedUser);
      setAuthToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser && authToken) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('token', authToken);
    }
  }, [currentUser, authToken]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Failed to log in');

      const data = await response.json();
      setCurrentUser(data.user);
      setAuthToken(data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://personal-blog-platform-a11db04dd963.herokuapp.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }

      const data = await response.json();
      setCurrentUser(data.user);
      setAuthToken(data.token);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setAuthToken(null);
  }, []);

  const setUserAndToken = (user, token) => {
    setCurrentUser(user);
    setAuthToken(token);
  };

  const getAuthHeader = () => {
    return { 'Authorization': `Bearer ${authToken}` };
  };

  const value = {
    currentUser,
    authToken,
    loading,
    login,
    logout,
    register,
    getAuthHeader,
    setUserAndToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
