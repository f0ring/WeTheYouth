import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { adminApi, donationApi, volunteerApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CarbonReport from '../components/CarbonReport';

  const AdminPanel = () => {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState('');
  const [status, setStatus] = useState('');
  const { currentUser } = useAuth();


<Card className="mt-4">
  <Card.Header>
    <h5 className="mb-0">Environmental Impact</h5>
  </Card.Header>
  <Card.Body>
    <CarbonReport />
  </Card.Body>
</Card>


  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching admin data...');
      
      const [donationsData, volunteersData] = await Promise.all([
        adminApi.getAllDonations().catch(err => {
          console.warn('Donations fetch error:', err);
          return [];
        }),
        volunteerApi.getAllVolunteers().catch(err => {
          console.warn('Volunteers fetch error:', err);
          return [];
        })
       
      ]);

      setDonations(donationsData || []);
      setVolunteers(volunteersData || []);
      
      console.log('Admin data loaded:', {
        donations: donationsData?.length || 0,
        volunteers: volunteersData?.length || 0
      });
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load admin data. Please check if the server is running and you have proper permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (item, type) => {
    setSelectedItem(item);
    setActionType(type);
    setStatus(item.status);
    setShowModal(true);
  };

  const confirmStatusUpdate = async () => {
    try {
      if (actionType === 'donation') {
        await adminApi.updateDonationStatus(selectedItem._id, { status });
      } else {
        await adminApi.updateVolunteerStatus(selectedItem._id, status);
      }
      setShowModal(false);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status. Please try again.');
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
    return <Badge bg={variants[status]}>{status?.toUpperCase() || 'UNKNOWN'}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="danger" className="text-center">
          <h4>Access Denied</h4>
          <p>You must be an administrator to access this page.</p>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading admin panel...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      <h1 className="text-center mb-4">Admin Panel</h1>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Error Loading Data</Alert.Heading>
          {error}
          <div className="mt-2">
            <Button variant="outline-danger" size="sm" onClick={fetchData}>
              Try Again
            </Button>
            <Button 
              variant="outline-secondary" 
              size="sm" 
              className="ms-2"
              onClick={() => console.log('Debug info:', { donations, volunteers })}
            >
              Debug Info
            </Button>
          </div>
        </Alert>
      )}
      
      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Donation Management</h5>
              <Badge bg="primary">{donations.length} total</Badge>
            </Card.Header>
            <Card.Body>
              {donations.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-donate fa-2x text-muted mb-3"></i>
                  <p className="text-muted">No donations found</p>
                </div>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Donor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation._id}>
                          <td>{donation.name || donation.user?.firstName || 'Unknown'}</td>
                          <td>৳{donation.amount}</td>
                          <td>{getStatusBadge(donation.status)}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleStatusUpdate(donation, 'donation')}
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Volunteer Applications</h5>
              <Badge bg="primary">{volunteers.length} total</Badge>
            </Card.Header>
            <Card.Body>
              {volunteers.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-hands-helping fa-2x text-muted mb-3"></i>
                  <p className="text-muted">No volunteer applications found</p>
                </div>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Section</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((volunteer) => (
                        <tr key={volunteer._id}>
                          <td>{volunteer.fullName}</td>
                          <td>{volunteer.interestedSection}</td>
                          <td>{getStatusBadge(volunteer.status)}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleStatusUpdate(volunteer, 'volunteer')}
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update {actionType === 'donation' ? 'Donation' : 'Volunteer'} Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                {actionType === 'donation' ? (
                  <>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </>
                ) : (
                  <>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmStatusUpdate}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-4">
          <Card.Header>
            <h6 className="mb-0">Debug Information</h6>
          </Card.Header>
          <Card.Body>
            <p>User Role: {currentUser.role}</p>
            <p>Donations API: {donations.length} items</p>
            <p>Volunteers API: {volunteers.length} items</p>
            <Button 
              variant="outline-info" 
              size="sm"
              onClick={fetchData}
            >
              Refresh Data
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AdminPanel;