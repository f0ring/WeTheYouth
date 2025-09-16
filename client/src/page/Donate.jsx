import React, { useState, useEffect } from "react";
import "../css/Donation.css";
import { makeGift, handleBkashSuccess } from "../components/donation";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { donationApi } from '../services/api';
import AuthModal from '../components/AuthModal';

const Donate = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBkashModal, setShowBkashModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [bkashLoading, setBkashLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    section: "",
    message: "",
    phone: "",
  });
  const [bkashData, setBkashData] = useState({
    transactionId: "",
    senderPhone: ""
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

  const handleBkashChange = (e) => {
    setBkashData({
      ...bkashData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBkashDonation = () => {
    if (!formData.amount || formData.amount <= 0) {
      setError("Please enter a valid donation amount first");
      return;
    }
    
    // Store donation data and show Bkash instructions
    makeGift({
      ...formData,
      amount: parseFloat(formData.amount),
      paymentMethod: 'bkash'
    });
    
    // Show modal for transaction ID input
    setShowBkashModal(true);
  };

  const confirmBkashPayment = async () => {
    setBkashLoading(true);
    setError("");
    
    try {
      if (!bkashData.transactionId) {
        throw new Error("Please enter your bKash transaction ID");
      }
      
      // Simulate Bkash payment confirmation
      const donationData = {
        ...formData,
        amount: parseFloat(formData.amount),
        paymentMethod: 'bkash',
        transactionId: bkashData.transactionId,
        senderPhone: bkashData.senderPhone,
        status: 'completed'
      };
      
      // If user is logged in, associate the donation with their account
      if (currentUser) {
        await donationApi.submitDonation(donationData);
      }
      
      // Handle successful payment
      handleBkashSuccess(bkashData.transactionId);
      
      setSuccess(`Thank you for your donation of ৳${formData.amount}! Transaction ID: ${bkashData.transactionId}`);
      setShowBkashModal(false);
      setBkashData({ transactionId: "", senderPhone: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setError(error.message || "There was an error confirming your payment.");
    } finally {
      setBkashLoading(false);
    }
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
        name: formData.name,
        paymentMethod: 'direct'
      };

      await donationApi.submitDonation(donationData);
      
      setSuccess("Thank you for your donation! We'll process it shortly.");
      setShowForm(false);
      setFormData({
        name: "",
        amount: "",
        section: "",
        message: "",
        phone: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
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

      {/* Success/Error Messages */}
      {success && <Alert variant="success" className="mx-3">{success}</Alert>}
      {error && <Alert variant="danger" className="mx-3">{error}</Alert>}

      {/* Donation Section */}
      <div className="donation-container">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
          alt="Donation Icon" 
        />
        <p><strong>Donate by Bkash</strong></p>
        
        {/* Amount input for both donation types */}
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
          />
        </Form.Group>
        
        {/* Bkash donation - available to everyone */}
        <button className="donate-btn" onClick={handleBkashDonation}>
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

      {/* Bkash Payment Confirmation Modal */}
      <Modal show={showBkashModal} onHide={() => setShowBkashModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm bKash Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please send <strong>৳{formData.amount}</strong> to our bKash agent number:</p>
          <h4 className="text-center text-primary">01759132586</h4>
          
          <div className="my-3 p-3 bg-light rounded">
            <h6>Instructions:</h6>
            <ol>
              <li>Go to your bKash Mobile Menu by dialing *247#</li>
              <li>Choose "Send Money"</li>
              <li>Enter our Agent Number: <strong>01759132586</strong></li>
              <li>Enter amount: <strong>৳{formData.amount}</strong></li>
              <li>Enter your bKash PIN to confirm</li>
            </ol>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label>Transaction ID *</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter bKash transaction ID" 
              name="transactionId" 
              value={bkashData.transactionId} 
              onChange={handleBkashChange} 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Your bKash Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your bKash number" 
              name="senderPhone" 
              value={bkashData.senderPhone} 
              onChange={handleBkashChange} 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBkashModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmBkashPayment}
            disabled={bkashLoading || !bkashData.transactionId}
          >
            {bkashLoading ? "Confirming..." : "Confirm Payment"}
          </Button>
        </Modal.Footer>
      </Modal>

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

      {/* Bkash Agent Information */}
      <div className="bkash-info mt-4 p-3 mx-3 bg-light rounded">
        <h4>Bkash Donation Instructions</h4>
        <p>You can send your donation to our Bkash Agent Number:</p>
        <div className="bkash-number display-6 text-primary">01759132586</div>
        <ol className="mt-3">
          <li>Go to your bKash Mobile Menu by dialing *247#</li>
          <li>Choose "Send Money"</li>
          <li>Enter our Agent Number: <strong>01759132586</strong></li>
          <li>Enter the amount you wish to donate</li>
          <li>Enter a reference if needed (optional)</li>
          <li>Enter your bKash Mobile Menu PIN to confirm</li>
        </ol>
        <p className="text-muted">You will receive a confirmation message from bKash</p>
      </div>

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