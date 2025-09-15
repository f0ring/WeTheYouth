import React, { useState } from 'react';
import { Navbar, Nav, Button, Dropdown, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import styles from '../css/navbar.module.css';

const Navbarr = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState('0 0 0 0 rgba(231, 76, 60, 0.4)');
  
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Pulsing animation effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation('0 0 0 0 rgba(231, 76, 60, 0.4)');
      setTimeout(() => setPulseAnimation('0 0 0 8px rgba(231, 76, 60, 0.2)'), 350);
      setTimeout(() => setPulseAnimation('0 0 0 12px rgba(231, 76, 60, 0)'), 700);
      setTimeout(() => setPulseAnimation('0 0 0 0 rgba(231, 76, 60, 0)'), 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setShowLogoutAlert(true);
    navigate('/');
    setTimeout(() => setShowLogoutAlert(false), 3000);
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: isHovered ? '#e74c3c' : 'white',
    color: isHovered ? 'white' : '#e74c3c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid #e74c3c',
    boxShadow: pulseAnimation,
    fontSize: '16px'
  };

  return (
    <>
      <Navbar expand="lg" className={styles.navbar} fixed="top">
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <span className={styles.logoText}>WE THE YOUTH</span>
        </Navbar.Brand>
        
        {showLogoutAlert && (
          <Alert variant="success" className="position-fixed top-0 start-50 translate-middle-x mt-5 z-3 logout-alert">
            <i className="fas fa-check-circle me-2"></i>
            You have been successfully logged out.
          </Alert>
        )}
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.navLink}>About</Nav.Link>
            <Nav.Link as={Link} to="/causes" className={styles.navLink}>Causes</Nav.Link>
            <Nav.Link as={Link} to="/take-action" className={styles.navLink}>Take Action</Nav.Link>
            {/* ADD DONATION LINK TO NAVBAR */}
            <Nav.Link as={Link} to="/donate" className={styles.navLink}>Donate</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.navLink}>Contact</Nav.Link>
            
            {currentUser ? (
              <Dropdown align="end" className="ms-2">
                <Dropdown.Toggle 
                  variant="outline-primary" 
                  className="d-flex align-items-center p-0 border-0 bg-transparent"
                  style={{background: 'transparent !important', border: 'none !important'}}
                >
                  <div 
                    className="user-avatar"
                    style={avatarStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="profile-dropdown">
                  <Dropdown.Header className="text-center profile-header">
                    <div className="user-avatar-large mb-2">
                      {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                    </div>
                    <h6 className="mb-0">{currentUser.firstName} {currentUser.lastName}</h6>
                    <small className="text-muted">{currentUser.email}</small>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/profile" className="dropdown-item-profile">
                    <i className="fas fa-user me-2"></i>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="dropdown-item-logout">
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button 
                  variant="outline-primary" 
                  className="ms-2" 
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </Button>
                <Button 
                  className={`${styles.donateBtn} ms-2`}
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Navbarr;