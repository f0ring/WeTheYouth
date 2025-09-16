import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../css/SessionTimer.css';
const SessionTimer = () => {
  const { logout, currentUser, getInactivityTimeLeft, updateActivity } = useAuth();
  const [inactivityTimeLeft, setInactivityTimeLeft] = useState(null);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const timer = setInterval(() => {
      const timeLeft = getInactivityTimeLeft();
      setInactivityTimeLeft(timeLeft);

      // Show warning 5 minutes before inactivity logout
      if (timeLeft <= 5 * 60 * 1000 && timeLeft > 0) {
        setShowInactivityWarning(true);
      } else {
        setShowInactivityWarning(false);
      }

      // Auto-logout when inactivity time expires
      if (timeLeft <= 0 && currentUser) {
        clearInterval(timer);
        logout();
        alert('You have been logged out due to inactivity.');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentUser, logout, getInactivityTimeLeft]);

  const formatTime = (milliseconds) => {
    if (!milliseconds || milliseconds <= 0) return '00:00:00';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStayLoggedIn = () => {
    updateActivity();
    setShowInactivityWarning(false);
  };

  if (!currentUser) return null;

  return (
    <>
      {showInactivityWarning && (
        <Alert variant="danger" className="mb-2">
          <i className="fas fa-hourglass-end me-2"></i>
          You will be logged out due to inactivity in {formatTime(inactivityTimeLeft)}.
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="ms-3"
            onClick={handleStayLoggedIn}
          >
            Stay Logged In
          </Button>
        </Alert>
      )}
      
      <div className="session-timer">
        <small className="text-muted">
          <i className="fas fa-clock me-1"></i>
          Auto-logout in: {formatTime(inactivityTimeLeft)}
        </small>
      </div>
    </>
  );
};

export default SessionTimer;