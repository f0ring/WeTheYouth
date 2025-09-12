import React, { useState } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import styles from '../css/navbar.module.css';

const Navbarr = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleAuthAction = (action) => {
    if (currentUser) {
      // User is logged in, perform the action
      // This would typically navigate to the protected page
      console.log(`Performing action: ${action}`);
    } else {
      // User is not logged in, show auth modal
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <Navbar expand="lg" className={styles.navbar} fixed="top">
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <span className={styles.logoText}>WE THE YOUTH</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.navLink}>About</Nav.Link>
            <Nav.Link as={Link} to="/causes" className={styles.navLink}>Causes</Nav.Link>
            <Nav.Link as={Link} to="/take-action" className={styles.navLink}>Take Action</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.navLink}>Contact</Nav.Link>
            
            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" className="ms-2">
                  <div className="user-avatar">
                    {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
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