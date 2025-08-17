import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Causes = () => {
  const causes = [
    {
      title: "Environmental Justice",
      description: "Fighting for sustainable solutions and climate action led by youth voices.",
      icon: "🌱"
    },
    {
      title: "Education Equity",
      description: "Ensuring access to quality education for all young people.",
      icon: "📚"
    },
    {
      title: "Social Equality",
      description: "Promoting diversity, inclusion, and equal opportunities.",
      icon: "✊"
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Our Causes</h1>
      <Row>
        {causes.map((cause, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 shadow-sm hover-grow">
              <Card.Body className="text-center">
                <div className="display-4 mb-3">{cause.icon}</div>
                <Card.Title>{cause.title}</Card.Title>
                <Card.Text>{cause.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Causes;