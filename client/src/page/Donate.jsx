import React, { useState } from "react";
import "../css/Donation.css";
import { makeGift } from "../components/donation";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { donationApi } from '../services/api';
import AuthModal from '../components/AuthModal';

const Donate = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    section: "",
    message: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!currentUser) {
      setShowAuthModal(true);
      setLoading(false);
      return;
    }

    try {
      if (!formData.amount || formData.amount <= 0) {
        throw new Error("Please enter a valid donation amount");
      }

      const donationData = {
        amount: parseFloat(formData.amount),
        section: formData.section,
        message: formData.message,
        phone: formData.phone,
        name: formData.name
      };

      await donationApi.submitDonation(donationData);
      
      alert("Thank you for your donation! We'll process it shortly.");
      setShowForm(false);
      setFormData({
        name: "",
        amount: "",
        section: "",
        message: "",
        phone: "",
      });
    } catch (error) {
      console.error('Donation error:', error);
      setError(error.message || "There was an error submitting your donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    if (!currentUser) {
      setShowAuthModal(true);
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="donation-page">
      {/* Banner */}
      <section className="banner">
        <h2><em>Support WTY</em></h2>
        <h3>Donate</h3>
        <p>support our program</p>
      </section>

      {/* Donation Section */}
      <div className="donation-container">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
          alt="Donation Icon" 
        />
        <p><strong>Donate by Bkash</strong></p>
        
        {/* Bkash donation - available to everyone */}
        <button className="donate-btn" onClick={makeGift}>
          Make a Gift via Bkash
        </button>

        {/* Donation form - requires sign in */}
        <button 
          className="donate-btn" 
          style={{ background: "#e63946", marginLeft: "10px" }}
          onClick={handleOpenForm}
          disabled={loading}
        >
          {loading ? "Processing..." : "Make a Direct Donation"}
        </button>

        {!currentUser && (
          <p className="text-muted mt-2">
            <small>Sign in required for direct donations</small>
          </p>
        )}
      </div>

      {/* Donation Form Modal */}
      <Modal show={showForm} onHide={() => !loading && setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Donation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Donation Amount (BDT) *</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter amount" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
                min="1"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Section / Cause *</Form.Label>
              <Form.Select 
                name="section" 
                value={formData.section} 
                onChange={handleChange} 
                required
                disabled={loading}
              >
                <option value="">Select a section</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Environment">Environment</option>
                <option value="General Fund">General Fund</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message / Note</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Leave a note..." 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="w-100 donate-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Donation"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Quote */}
      <div className="quote">
        "Be the light in someone's darkest moment. Donate today & make an impact."
      </div>

      {/* Footer */}
      <footer>
        <p>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            www.wetheyouth.com
          </a>
        </p>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" width="30" alt="instagram" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384023.png" width="30" alt="whatsapp" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" width="30" alt="facebook" /></a>
      </footer>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Donate;