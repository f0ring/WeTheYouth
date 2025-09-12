import apiRequest from './api';

// Store token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Register user
export const register = async (userData) => {
  try {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      return null;
    }
    
    const response = await apiRequest('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.user;
  } catch (error) {
    // If token is invalid, remove it
    setAuthToken(null);
    return null;
  }
};

// Logout user
export const logout = () => {
  setAuthToken(null);
};