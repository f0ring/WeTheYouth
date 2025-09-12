import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  
  // Sample data - replace with actual donation data from your backend
  const donationHistory = [];

  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h1 className="text-center mb-4 section-title">My Profile</h1>
          
          <Row>
            <Col md={4}>
              <Card className="shadow-sm profile-card">
                <Card.Body className="text-center p-4">
                  <div className="user-avatar-profile mx-auto">
                    {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                  </div>
                  <h3 className="mt-3 profile-name">{currentUser.firstName} {currentUser.lastName}</h3>
                  <p className="text-muted profile-email">{currentUser.email}</p>
                  
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-number">0</span>
                      <span className="stat-label">Donations</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">Member</span>
                      <span className="stat-label">Since Today</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={8}>
              <Card className="shadow-sm profile-card">
                <Card.Body className="p-4">
                  <h4 className="card-title">Donation History</h4>
                  
                  {donationHistory.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-donate fa-3x mb-3 text-muted"></i>
                      <h5 className="text-muted">No donations yet</h5>
                      <p className="text-muted mb-4">Your donation history will appear here once you make your first contribution.</p>
                      <Button 
                        as={Link} 
                        to="/donate" 
                        className="cta-button"
                      >
                        <i className="fas fa-heart me-2"></i>
                        Make Your First Donation
                      </Button>
                    </div>
                  ) : (
                    <div className="donation-list">
                      {/* Donation history would be listed here */}
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              <Card className="shadow-sm profile-card mt-4">
                <Card.Body className="p-4">
                  <h4 className="card-title">Account Details</h4>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>First Name:</strong>
                    </Col>
                    <Col sm={8}>
                      {currentUser.firstName}
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Last Name:</strong>
                    </Col>
                    <Col sm={8}>
                      {currentUser.lastName}
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Email:</strong>
                    </Col>
                    <Col sm={8}>
                      {currentUser.email}
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col sm={4}>
                      <strong>Member Since:</strong>
                    </Col>
                    <Col sm={8}>
                      {new Date().toLocaleDateString()}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;