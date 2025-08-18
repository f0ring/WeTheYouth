import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="about-title">"Meet the Change-Makers Behind the Movement"</h1>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stories Section */}
      <section className="stories-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h2 className="section-title text-center mb-5">Our Stories</h2>
              
              {/* Story 1 */}
              <div className="story-card mb-5">
                <h3 className="story-title">Youth for Earth</h3>
                <p className="story-quote">"This planet isn't a resource. It's a relationship."</p>
                <p className="story-content">
                  Our Save the Planet campaign is led by passionate young environmentalists who are planting trees, 
                  banning plastic, and demanding their corporations and governments treat climate change as the crisis it is.
                </p>
              </div>

              {/* Story 2 */}
              <div className="story-card mb-5">
                <h3 className="story-title">Mind Matters – Breaking the Mental Health Stigma</h3>
                <p className="story-content">
                  We aim to create a culture where conversations about mental well-being are normal, open, and safe. 
                  Through school sessions, digital storytelling, and community support hubs, we're helping youth 
                  understand that it's okay to not be okay.
                </p>
              </div>

              {/* Story 3 */}
              <div className="story-card">
                <h3 className="story-title">Equal Rights Now – Not Later</h3>
                <p className="story-content">
                  In every corner of the world, young people are rising to demand fairness – for women, 
                  people of color, and marginalized groups. Our Equal Rights Now campaign is about ending 
                  systemic inequality and amplifying the voices that have been silenced for too long.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Link */}
      <section className="about-footer py-4 text-center">
        <Container>
          <a 
            href="https://www.wetheyouth.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="website-link"
          >
            www.wetheyouth.com
          </a>
        </Container>
      </section>
    </div>
  );
};

export default About;