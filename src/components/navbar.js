import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../css/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbarr = () => {
  return (
    <Navbar expand="lg" className={`${styles.navbar} ${styles.customNavbar}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          We The Youth
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.navLink}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;