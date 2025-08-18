import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';
import Footer from '../components/Footer';

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [counters, setCounters] = useState({
    volunteers: 0,
    cities: 0,
    actions: 0
  });

  useEffect(() => {
    // Set loaded to true after component mounts for animation
    setLoaded(true);
    
    // Animate counters
    const targetValues = { volunteers: 500, cities: 7, actions: 3000 };
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animateCounters = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);

      setCounters({
        volunteers: Math.floor(progress * targetValues.volunteers),
        cities: Math.floor(progress * targetValues.cities),
        actions: Math.floor(progress * targetValues.actions)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    const handleScroll = () => {
      const statsSection = document.querySelector('.stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          animateCounters();
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                as={Link} 
                to="/donate" 
                variant="danger" 
                size="lg" 
                className="cta-button mb-4 shake-on-hover"
              >
                MAKE A CHANGE!!
              </Button>
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  as={Link} 
                  to="/causes" 
                  variant="outline-secondary" 
                  className="hover-grow"
                >
                  Explore Causes
                </Button>
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="outline-secondary" 
                  className="hover-grow"
                >
                  Contact Us
                </Button>
              </div>
              <div className="website-link mt-4">
                <a href="https://www.wetheyouth.com" target="_blank" rel="noopener noreferrer">
                  www.wetheyouth.com
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;