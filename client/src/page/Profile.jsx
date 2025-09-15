import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { donationApi, volunteerApi } from '../services/api';

const Profile = () => {
  const { currentUser } = useAuth();
  const [donations, setDonations] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Use Promise.allSettled to handle potential errors in either request
      const [donationsResult, applicationsResult] = await Promise.allSettled([
        donationApi.getMyDonations().catch(err => []), // Return empty array on error
        volunteerApi.getMyApplications().catch(err => []) // Return empty array on error
      ]);

      setDonations(donationsResult.value || []);
      setVolunteerApplications(applicationsResult.value || []);
      
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'info',
      completed: 'success',
      failed: 'danger',
      approved: 'success',
      rejected: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status?.toUpperCase() || 'UNKNOWN'}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading your profile...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <h1 className="text-center mb-4 section-title">My Profile</h1>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              <Alert.Heading>Oops!</Alert.Heading>
              {error}
              <div className="mt-2">
                <Button variant="outline-danger" size="sm" onClick={fetchData}>
                  Try Again
                </Button>
              </div>
            </Alert>
          )}
          
          <Row>
            <Col md={4}>
              <Card className="shadow-sm profile-card">
                <Card.Body className="text-center p-4">
                  <div className="user-avatar-profile mx-auto">
                    {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                  </div>
                  <h3 className="mt-3 profile-name">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </h3>
                  <p className="text-muted profile-email">{currentUser?.email}</p>
                  
                  {/* Volunteer Status Badge */}
                  {currentUser?.isVolunteer && (
                    <Badge bg="success" className="mb-3 py-2 px-3">
                      <i className="fas fa-hands-helping me-2"></i>
                      Active Volunteer
                      {currentUser?.volunteerSince && (
                        <small className="d-block mt-1">
                          Since {formatDate(currentUser.volunteerSince)}
                        </small>
                      )}
                    </Badge>
                  )}
                  
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-number">{donations.length}</span>
                      <span className="stat-label">Donations</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">
                        {donations.filter(d => d.status === 'completed').length}
                      </span>
                      <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{volunteerApplications.length}</span>
                      <span className="stat-label">Applications</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={8}>
              {/* Donation History */}
              <Card className="shadow-sm profile-card mb-4">
                <Card.Body className="p-4">
                  <h4 className="card-title">Donation History</h4>
                  
                  {donations.length === 0 ? (
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
                      {donations.map((donation) => (
                        <div key={donation._id} className="donation-item mb-3 p-3 border rounded">
                          <Row>
                            <Col md={6}>
                              <strong>Amount: </strong>৳{donation.amount}
                              <br />
                              <strong>For: </strong>{donation.section}
                              <br />
                              <strong>Date: </strong>{formatDate(donation.createdAt)}
                            </Col>
                            <Col md={6} className="text-end">
                              {getStatusBadge(donation.status)}
                              <br />
                              {donation.transactionId && (
                                <small className="text-muted">
                                  TXN: {donation.transactionId}
                                </small>
                              )}
                            </Col>
                          </Row>
                          {donation.message && (
                            <div className="mt-2">
                              <strong>Note: </strong>{donation.message}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              {/* Volunteer Applications */}
              <Card className="shadow-sm profile-card mb-4">
                <Card.Body className="p-4">
                  <h4 className="card-title">Volunteer Applications</h4>
                  
                  {volunteerApplications.length === 0 ? (
                    <div className="text-center py-3">
                      <i className="fas fa-hands-helping fa-3x mb-3 text-muted"></i>
                      <h5 className="text-muted">No volunteer applications</h5>
                      <p className="text-muted mb-4">You haven't applied to be a volunteer yet.</p>
                      <Button 
                        as={Link} 
                        to="/take-action" 
                        className="cta-button"
                      >
                        <i className="fas fa-handshake me-2"></i>
                        Apply as Volunteer
                      </Button>
                    </div>
                  ) : (
                    <div className="volunteer-list">
                      {volunteerApplications.map((application) => (
                        <div key={application._id} className="volunteer-item mb-3 p-3 border rounded">
                          <Row>
                            <Col md={6}>
                              <strong>Interested in: </strong>{application.interestedSection}
                              <br />
                              <strong>Applied on: </strong>{formatDate(application.createdAt)}
                              <br />
                              <strong>Contact: </strong>{application.contactNumber}
                            </Col>
                            <Col md={6} className="text-end">
                              {getStatusBadge(application.status)}
                              {application.approvedAt && (
                                <div className="mt-2">
                                  <small className="text-muted">
                                    Approved on: {formatDate(application.approvedAt)}
                                  </small>
                                </div>
                              )}
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              {/* Account Details */}
              <Card className="shadow-sm profile-card">
                <Card.Body className="p-4">
                  <h4 className="card-title">Account Details</h4>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>First Name:</strong>
                    </Col>
                    <Col sm={8}>
                      {currentUser?.firstName}
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Last Name:</strong>
                    </Col>
                    <Col sm={8}>
                      {currentUser?.lastName}
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Email:</strong>
                    </Col>
                    <Col sm={8}>
                      {currentUser?.email}
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Member Since:</strong>
                    </Col>
                    <Col sm={8}>
                      {formatDate(currentUser?.createdAt)}
                    </Col>
                  </Row>
                  
                  {currentUser?.isVolunteer && (
                    <Row>
                      <Col sm={4}>
                        <strong>Volunteer Since:</strong>
                      </Col>
                      <Col sm={8}>
                        {formatDate(currentUser?.volunteerSince)}
                      </Col>
                    </Row>
                  )}
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