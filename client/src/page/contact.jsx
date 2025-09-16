import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { contactApi } from '../services/api';

const Contact = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    if (!currentUser) {
      setShowAuthModal(true);
      setLoading(false);
      return;
    }

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      const contactData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      await contactApi.submitContact(contactData);
      
      setSuccess("Thank you for your message! We'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setError(error.message || "There was an error submitting your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-lg mb-8 text-center text-gray-700">
        Have any questions, suggestions, or want to collaborate? 
        Fill out the form below or reach us through email, phone, or social media.
      </p>

      {/* Contact Info */}
      <div className="bg-gray-100 rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
        <p className="mb-2"><strong>Email:</strong> support@yourorg.com</p>
        <p className="mb-2"><strong>Phone:</strong> +880 1234 567 890</p>
        <p className="mb-4"><strong>Address:</strong> Dhaka, Bangladesh</p>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-500 hover:underline">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sky-500 hover:underline">
            Twitter
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        
        {!currentUser && (
          <Alert variant="info" className="mb-4">
            Please sign in to send us a message.
          </Alert>
        )}
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your name"
              disabled={!currentUser || loading}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
              disabled={!currentUser || loading}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 h-28 resize-none focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Write your message here..."
              disabled={!currentUser || loading}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!currentUser || loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
        <iframe
          title="Google Map"
          className="w-full h-64 rounded-2xl shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.843168145954!2d90.391368!3d23.750885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd8fef5b2b%3A0x6e38b6d4e8f5a9e!2sDhaka!5e0!3m2!1sen!2sbd!4v1675329876543"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Contact;