import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as loginApi, register as registerApi, logout as logoutApi } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Update activity on user interaction
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        setLastActivity(Date.now()); // Set initial activity time
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Auto-logout after 30 minutes of inactivity
  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      
      // Logout after 30 minutes of inactivity (1800000 ms)
      if (timeSinceLastActivity > 30* 60 * 1000 && currentUser) {
        console.log('Auto-logout due to inactivity');
        logout();
        alert('You have been logged out due to inactivity.');
      }
    }, 60000); // Check every minute

    return () => clearInterval(inactivityTimer);
  }, [lastActivity, currentUser]);

  // Set up activity listeners
  useEffect(() => {
    if (!currentUser) return;

    const handleUserActivity = () => {
      updateActivity();
    };

    // Add event listeners for user activity
    const events = ['mousemove', 'keypress', 'click', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [currentUser]);

  // Register function
  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      setCurrentUser(response.user);
      setLastActivity(Date.now());
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      setCurrentUser(response.user);
      setLastActivity(Date.now());
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    logoutApi();
    setCurrentUser(null);
  };

  // Get time left until auto-logout
  const getInactivityTimeLeft = () => {
    if (!currentUser) return null;
    const timeSinceLastActivity = Date.now() - lastActivity;
    const timeLeft = (30 * 60 * 1000) - timeSinceLastActivity;
    return timeLeft > 0 ? timeLeft : 0;
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading,
    updateActivity,
    getInactivityTimeLeft
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};