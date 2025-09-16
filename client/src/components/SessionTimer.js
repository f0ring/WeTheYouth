import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../css/SessionTimer.css';

const SessionTimer = () => {
  const { logout, currentUser, getInactivityTimeLeft, updateActivity } = useAuth();
  const [inactivityTimeLeft, setInactivityTimeLeft] = useState(null);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const [timerState, setTimerState] = useState('normal'); // normal, warning, danger

  useEffect(() => {
    if (!currentUser) return;

    const timer = setInterval(() => {
      const timeLeft = getInactivityTimeLeft();
      setInactivityTimeLeft(timeLeft);

      // Determine timer state based on time left
      if (timeLeft <= 1 * 60 * 1000 && timeLeft > 0) {
        setTimerState('danger');
        setShowInactivityWarning(true);
      } else if (timeLeft <= 5 * 60 * 1000 && timeLeft > 0) {
        setTimerState('warning');
        setShowInactivityWarning(true);
      } else {
        setTimerState('normal');
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
    if (!milliseconds || milliseconds <= 0) return '00:00';
    
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStayLoggedIn = () => {
    updateActivity();
    setShowInactivityWarning(false);
    setTimerState('normal');
  };

  if (!currentUser) return null;

  return (
    <>
      {showInactivityWarning && (
        <Alert variant="danger" className="inactivity-alert">
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <i className="fas fa-hourglass-end me-2"></i>
            <span>You will be logged out in {formatTime(inactivityTimeLeft)}</span>
            <Button 
              variant="outline-danger" 
              size="sm" 
              className="ms-3"
              onClick={handleStayLoggedIn}
            >
              Stay Logged In
            </Button>
          </div>
        </Alert>
      )}
      
      <div className={`session-timer ${timerState}`}>
        <small>
          <i className="fas fa-clock me-1"></i>
          Auto-logout: {formatTime(inactivityTimeLeft)}
        </small>
      </div>
    </>
  );
};

export default SessionTimer;