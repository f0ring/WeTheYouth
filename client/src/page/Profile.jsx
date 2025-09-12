import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">My Profile</h1>
          
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="user-avatar-profile mx-auto">
                  {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                </div>
                <h3 className="mt-3">{currentUser.firstName} {currentUser.lastName}</h3>
                <p className="text-muted">{currentUser.email}</p>
              </div>
              
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>First Name:</strong>
                </Col>
                <Col sm={6}>
                  {currentUser.firstName}
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Last Name:</strong>
                </Col>
                <Col sm={6}>
                  {currentUser.lastName}
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Email:</strong>
                </Col>
                <Col sm={6}>
                  {currentUser.email}
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col sm={6}>
                  <strong>Member Since:</strong>
                </Col>
                <Col sm={6}>
                  {new Date().toLocaleDateString()}
                </Col>
              </Row>
              
              <div className="text-center mt-4">
                <Button variant="primary" className="me-2">
                  <i className="fas fa-edit me-2"></i>
                  Edit Profile
                </Button>
                <Button variant="outline-secondary">
                  <i className="fas fa-lock me-2"></i>
                  Change Password
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;