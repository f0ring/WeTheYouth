import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/navbar.module.css';
import { Link, useLocation } from 'react-router-dom';

const Navbarr = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <span className={styles.logoText}>We The Youth</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
            >
              About
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/causes" 
              className={`${styles.navLink} ${location.pathname === '/causes' ? styles.active : ''}`}
            >
              Causes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/take-action" 
              className={`${styles.navLink} ${location.pathname === '/take-action' ? styles.active : ''}`}
            >
              Take Action
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/donate" 
              className={`${styles.navLink} ${styles.donateBtn} ${location.pathname === '/donate' ? styles.active : ''}`}
            >
              Donate
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;