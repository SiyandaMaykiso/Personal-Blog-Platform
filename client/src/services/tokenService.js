


export const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
    
    import('./axiosConfig').then(axiosConfig => {
      axiosConfig.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
  };
  
 
  export const getToken = () => {
    return localStorage.getItem('jwtToken');
  };
  
  
  export const removeToken = () => {
    localStorage.removeItem('jwtToken');
    import('./axiosConfig').then(axiosConfig => {
      delete axiosConfig.default.defaults.headers.common['Authorization'];
    });
  };
  