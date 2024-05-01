// Utility functions for JWT token management

// Sets the token to local storage and axios headers
export const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
    // Set the token to axios default header directly after setting it in local storage
    import('./services/axiosConfig').then(axiosConfig => {
      axiosConfig.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
  };
  
  // Gets the token from local storage
  export const getToken = () => {
    return localStorage.getItem('jwtToken');
  };
  
  // Removes the token from local storage and axios headers
  export const removeToken = () => {
    localStorage.removeItem('jwtToken');
    import('./services/axiosConfig').then(axiosConfig => {
      delete axiosConfig.default.defaults.headers.common['Authorization'];
    });
  };
  