import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/HomePage.css';

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [counters, setCounters] = useState({
    volunteers: 0,
    cities: 0,
    actions: 0
  });

  useEffect(() => {
    setLoaded(true);

    const targetValues = { volunteers: 500, cities: 7, actions: 3000 };
    const duration = 2000;
    const startTime = Date.now();

    const animateCounters = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      setCounters({
        volunteers: Math.floor(progress * targetValues.volunteers),
        cities: Math.floor(progress * targetValues.cities),
        actions: Math.floor(progress * targetValues.actions)
      });
      if (progress < 1) requestAnimationFrame(animateCounters);
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
              <p className="join-text">Join the movement</p>
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
                className="cta-button mb-3 shake-on-hover"
              >
                MAKE A CHANGE!!
              </Button>
              <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                <Button as={Link} to="/causes" variant="outline-secondary" className="hover-grow">
                  Explore Causes
                </Button>
                <Button as={Link} to="/contact" variant="outline-secondary" className="hover-grow">
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

      {/* Take Action Section (Separate Section) */}
      <section className="take-action-home py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="section-title mb-4">Take Action Today!</h2>
              <p className="lead mb-4">
                Join our community of volunteers and make a real impact in your city.
              </p>
              <Button
                as={Link}
                to="/take-action"
                variant="success"
                size="lg"
                className="cta-button shake-on-hover"
              >
                Be a Volunteer
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
