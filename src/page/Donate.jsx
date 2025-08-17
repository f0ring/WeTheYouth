import React from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';

const Donate = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="text-center mb-4">Support Our Movement</h1>
          <p className="text-center lead mb-5">
            Your donation helps empower youth leaders and fund critical initiatives for social and environmental justice.
          </p>
          
          <div className="mb-5 p-4 border rounded shadow-sm">
            <h3 className="mb-4">Current Fundraising Goal</h3>
            <ProgressBar now={65} label={`65%`} className="mb-3" style={{ height: '30px' }} />
            <p className="text-muted">$32,500 raised of $50,000 goal</p>
          </div>
          
          <Row className="g-4 mb-5">
            <Col md={4}>
              <Button variant="primary" size="lg" className="w-100 py-3">
                $25
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="primary" size="lg" className="w-100 py-3">
                $50
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="primary" size="lg" className="w-100 py-3">
                $100
              </Button>
            </Col>
          </Row>
          
          <div className="text-center">
            <Button variant="outline-primary" size="lg" className="px-5">
              Custom Amount
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Donate;