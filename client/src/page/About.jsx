import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import '../css/About.css';
import { aboutApi } from '../services/api';
import { useNavigate } from "react-router-dom";
const About = () => {

  const navigate = useNavigate();
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
        setError('Failed to load stories from database');
        // You can keep fallback data here if needed
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
            <span className="visually-hidden">Loading stories...</span>
          </Spinner>
          <p className="mt-3">Loading stories from database...</p>
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
                  {error}
                </Alert>
              )}

              {stories.map((story, index) => (
                <div key={story._id || index} className="story-card mb-5">
                  <h3 className="story-title">{story.title}</h3>
                  {story.quote && (
                    <p className="story-quote">"{story.quote}"</p>
                  )}
                  <p className="story-content">{story.content}</p>
                  {story.category && (
                    <span className="story-category badge bg-secondary">
                      {story.category}
                    </span>
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Link */}
      <section className="about-footer py-4 text-center">
        <Container>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>www.wetheyouth.com</a>
        </Container>
      </section>
    </div>
  );
};

export default About;