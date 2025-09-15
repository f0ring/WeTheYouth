import React, { useState } from "react";
import "../css/takeAction.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { volunteerApi } from '../services/api';
import AuthModal from '../components/AuthModal';

const TakeAction = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    interestedSection: "",
    age: "",
    occupation: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleRegisterClick = () => {
    if (!currentUser) {
      setShowAuthModal(true);
    } else {
      setShowForm(true);
    }
  };

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
    
    try {
      await volunteerApi.submitVolunteer(formData);
      alert("Thank you for registering as a Volunteer! We'll contact you soon.");
      setShowForm(false);
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        address: "",
        interestedSection: "",
        age: "",
        occupation: ""
      });
    } catch (error) {
      console.error('Volunteer registration error:', error);
      setError("There was an error submitting your registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="take-action">
      {/* Fixed heading inside green bar */}
      <div className="quote-bar">
        <h2 className="heading">
          "The best way to find yourself is to lose yourself in the service of others"
        </h2>
      </div>

      {!showForm && (
        <>
          <button className="register-btn" onClick={handleRegisterClick}>
            Register as a Volunteer
          </button>
          {!currentUser && (
            <p className="text-muted mt-2">
              <small>Sign in required to register as volunteer</small>
            </p>
          )}
        </>
      )}

      {showForm && (
        <div className="form-container">
          <h3>Volunteer Registration Form</h3>
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Full Name" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <input 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <input 
              type="text" 
              placeholder="Contact Number" 
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <input 
              type="text" 
              placeholder="Address" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <input 
              type="text" 
              placeholder="Interested Section" 
              name="interestedSection"
              value={formData.interestedSection}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <input 
              type="number" 
              placeholder="Age" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <input 
              type="text" 
              placeholder="Occupation" 
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required 
              disabled={loading}
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {/* Two-column section */}
      <div className="content-row">
        <div className="mission">
          <h3>Together we rise</h3>
          <p>✨ Be a voice of hope in time of crisis</p>
          <p>💪 Use your strength to uplift those in need</p>
          <p>❤️ Serve with passion, lead with compassion</p>
        </div>

        <div className="youth-activities">
          <h3><b>Youth Friendly Campaigns</b></h3>
          <ul>
            <li>🌱 Tree planting campaigns</li>
            <li>🧹 Street/Park cleaning drives</li>
            <li>👵 Visiting elderly homes</li>
            <li>🍱 Food distribution</li>
            <li>📚 Clothes & book drives</li>
            <li>🐶 Animal shelter help</li>
            <li>🌍 Cultural exchange events</li>
          </ul>
        </div>
      </div>

      <div className="info">
        <p>
          We have over <b>3000+ volunteers</b> across Bangladesh committed to help
          during environmental challenges, mental health issues, and other emergencies.
        </p>
        <p>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <b>www.wetheyouth.com</b>
          </a>
        </p>
      </div>

      <div className="social-icons">
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
      </div>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default TakeAction;
