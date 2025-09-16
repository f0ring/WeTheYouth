import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // If not logged in, redirect to home
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  // If adminOnly check required and user is not admin
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated (and admin if required), show the protected content
  return children;
};

export default ProtectedRoute;