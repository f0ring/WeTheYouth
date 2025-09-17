import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HomePage.css';
import Footer from '../components/Footer';
import { homeApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [counters, setCounters] = useState({
    volunteers: 0,
    cities: 0,
    actions: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState(null);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const stats = await homeApi.getStatistics();
      setCounters({
        volunteers: stats.volunteers || 0,
        cities: stats.cities || 0,
        actions: stats.actions || 0
      });
      animateCounters(stats);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Failed to load statistics');
      animateCounters({ volunteers: 500, cities: 7, actions: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const animateCounters = (targetValues) => {
    // ... your existing animation code
  };

  const handleAuthAction = (action) => {
    if (currentUser) {
      // User is authenticated, navigate to the page
      navigate(`/${action}`);
    } else {
      // User is not authenticated, show auth modal
      setAuthAction(action);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    if (authAction) {
      navigate(`/${authAction}`);
    }
    setShowAuthModal(false);
    setAuthAction(null);
  };

  return (
    <div className={`home-page ${loaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="hero-title">"EMPOWERING YOUTH. SPARKING CHANGE."</h1>
              <div className="hero-cta">
                <p className="join-text">Join the movement</p>
                <Button 
                  as={Link} 
                  to="/about" 
                  variant="primary" 
                  size="lg" 
                  className="mt-3 pulse-btn"
                >
                  Learn more
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="mission-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="section-title mb-4">Our Mission</h2>
              <p className="mission-text">
                We believe that young voices can lead real change.<br />
                Our mission is to empower youth to take bold action for social and environmental justice — through awareness, collaboration, and creativity. Together, we build a future rooted in equality, sustainability, and hope.
              </p>
              <Button 
                as={Link} 
                to="/about" 
                variant="outline-primary" 
                size="lg" 
                className="mt-4 hover-grow"
              >
                Discover More About Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={4} className="mb-5 mb-md-0">
              <div className="stat-number">{counters.volunteers}+</div>
              <div className="stat-label">Volunteers</div>
            </Col>
            <Col md={4} className="mb-5 mb-md-0">
              <div className="stat-number">{counters.cities}</div>
              <div className="stat-label">Cities Reached</div>
            </Col>
            <Col md={4}>
              <div className="stat-number">{counters.actions}+</div>
              <div className="stat-label">Actions</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="section-title mb-4">Ready to Make a Difference?</h2>
              <Button 
                onClick={() => handleAuthAction('donate')}
                variant="danger" 
                size="lg" 
                className="cta-button mb-4 shake-on-hover"
              >
                MAKE A CHANGE!!
              </Button>
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  onClick={() => handleAuthAction('causes')}
                  variant="outline-secondary" 
                  className="hover-grow"
                >
                  Explore Causes
                </Button>
                <Button 
                  onClick={() => handleAuthAction('contact')}
                  variant="outline-secondary" 
                  className="hover-grow"
                >
                  Contact Us
                </Button>
              </div>
              <div className="website-link mt-4">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="website-link">
                  www.wetheyouth.com
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => {
          setShowAuthModal(false);
          setAuthAction(null);
        }}
        onSuccess={handleAuthSuccess}
        defaultTab="register"
      />

      
    </div>
  );
};

export default HomePage;