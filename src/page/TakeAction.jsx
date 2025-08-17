import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TakeAction = () => {
  const actions = [
    {
      title: "Join a Campaign",
      description: "Participate in our ongoing initiatives",
      link: "/campaigns"
    },
    {
      title: "Start a Chapter",
      description: "Bring We The Youth to your community",
      link: "/start-chapter"
    },
    {
      title: "Volunteer",
      description: "Give your time and skills",
      link: "/volunteer"
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Take Action</h1>
      <Row className="g-4">
        {actions.map((action, index) => (
          <Col md={4} key={index}>
            <div className="p-4 border rounded text-center h-100 hover-grow">
              <h3>{action.title}</h3>
              <p className="mb-3">{action.description}</p>
              <Button as={Link} to={action.link} variant="outline-primary">
                Learn More
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TakeAction;