import React, { useState } from "react";
import "../css/Donation.css";
import { makeGift } from "../components/donation";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    section: "",
    message: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Form Submitted:", formData);
    alert("Thank you for your donation!");
    setShowForm(false);
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
        <button className="donate-btn" onClick={makeGift}>
          Make a Gift via Bkash
        </button>

        {/* Direct Donation Button - AUTHENTICATION NEEDED HERE */}
        <button 
          className="donate-btn" 
          style={{ background: "#e63946", marginLeft: "10px" }}
          onClick={() => setShowForm(true)}
        >
          Make a Direct Donation
        </button>

        {/* TODO: Add authentication check for direct donations */}
      </div>

      {/* Donation Form Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Donation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Donation Amount</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter amount" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Section / Cause</Form.Label>
              <Form.Select 
                name="section" 
                value={formData.section} 
                onChange={handleChange} 
                required
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Button type="submit" className="w-100 donate-btn">
              Submit Donation
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
    </div>
  );
};

export default Donate;