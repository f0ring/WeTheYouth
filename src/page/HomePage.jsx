import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/HomePage.css';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="hero-title">"EMPOWERING YOUTH. SPARKING CHANGE."</h1>
              <div className="hero-cta">
                <p className="join-text">Join the movement</p>
                <Button variant="primary" size="lg" className="mt-3">
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
            <Col lg={8}>
              <h2 className="section-title text-center mb-4">Our Mission</h2>
              <p className="mission-text text-center">
                We believe that young voices can lead real change.<br />
                Our mission is to empower youth to take bold action for social and environmental justice — through awareness, collaboration, and creativity. Together, we build a future rooted in equality, sustainability, and hope.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-4">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="stat-number">500+</div>
              <div className="stat-label">Volunteers</div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="stat-number">7</div>
              <div className="stat-label">Cities Reached</div>
            </Col>
            <Col md={4}>
              <div className="stat-number">3000+</div>
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
              <Button variant="danger" size="lg" className="cta-button mb-3">
                MAKE A CHANGE!!
              </Button>
              <div className="website-link">
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