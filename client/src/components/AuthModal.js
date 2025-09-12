import React, { useState } from 'react';
import { Modal, Button, Form, Tab, Tabs, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ show, onHide, defaultTab = 'login', onSuccess }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      });
      onHide();
      if (onSuccess) onSuccess();
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setLoading(true);

    try {
      const response = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      onHide();
      if (onSuccess) onSuccess();
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">
          {activeTab === 'login' ? 'Sign In to WeTheYouth' : 'Create Your Account'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {error && <Alert variant="danger" className="auth-alert">{error}</Alert>}
        
        <Tabs
          activeKey={activeTab}
          onSelect={(tab) => {
            setActiveTab(tab);
            setError('');
          }}
          className="auth-tabs mb-3"
        >
          <Tab eventKey="login" title="Sign In" className="auth-tab">
            <Form onSubmit={handleLogin} className="auth-form">
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 auth-button" 
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form>
            <div className="text-center mt-3 auth-link">
              <span>Don't have an account? </span>
              <button 
                type="button" 
                className="btn-link" 
                onClick={() => setActiveTab('register')}
              >
                Sign up here
              </button>
            </div>
          </Tab>
          
          <Tab eventKey="register" title="Sign Up" className="auth-tab">
            <Form onSubmit={handleRegister} className="auth-form">
              <div className="row">
                <div className="col-md-6 mb-3 form-group">
                  <Form.Label className="form-label">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col-md-6 mb-3 form-group">
                  <Form.Label className="form-label">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  placeholder="Create a password (min. 6 characters)"
                />
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  placeholder="Confirm your password"
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 auth-button" 
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Form>
            <div className="text-center mt-3 auth-link">
              <span>Already have an account? </span>
              <button 
                type="button" 
                className="btn-link" 
                onClick={() => setActiveTab('login')}
              >
                Sign in here
              </button>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;