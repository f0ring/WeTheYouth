import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import '../css/About.css';
import { aboutApi } from '../services/api';

const About = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const storiesData = await aboutApi.getStories();
        setStories(storiesData);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
        setError('Failed to load stories');
        // Fallback to default stories
        setStories([
          {
            title: "Youth for Earth",
            quote: "This planet isn't a resource. It's a relationship.",
            content: "Our Save the Planet campaign is led by passionate young environmentalists who are planting trees, banning plastic, and demanding their corporations and governments treat climate change as the crisis it is."
          },
          {
            title: "Mind Matters – Breaking the Mental Health Stigma",
            content: "We aim to create a culture where conversations about mental well-being are normal, open, and safe. Through school sessions, digital storytelling, and community support hubs, we're helping youth understand that it's okay to not be okay."
          },
          {
            title: "Equal Rights Now – Not Later",
            content: "In every corner of the world, young people are rising to demand fairness – for women, people of color, and marginalized groups. Our Equal Rights Now campaign is about ending systemic inequality and amplifying the voices that have been silenced for too long."
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <div className="about-page">
        <Container className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading stories...</p>
        </Container>
      </div>
    );
  }

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
              
              {error && (
                <Alert variant="warning" className="mb-4">
                  {error} - Showing demo content
                </Alert>
              )}

              {stories.map((story, index) => (
                <div key={index} className="story-card mb-5">
                  <h3 className="story-title">{story.title}</h3>
                  {story.quote && (
                    <p className="story-quote">"{story.quote}"</p>
                  )}
                  <p className="story-content">{story.content}</p>
                </div>
              ))}
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