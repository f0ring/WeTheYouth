import React, { useState } from "react";
import "../css/takeAction.css";
import { useNavigate } from "react-router-dom";

const TakeAction = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    interestedSection: "",
    age: "",
    occupation: ""
  });
  const navigate = useNavigate();

  const handleRegisterClick = () => setShowForm(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer Form Submitted:", formData);
    alert("Thank you for registering as a Volunteer!");
    setShowForm(false);
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
        <button className="register-btn" onClick={handleRegisterClick}>
          Register as a Volunteer
        </button>
      )}

      {showForm && (
        <div className="form-container">
          <h3>Volunteer Registration Form</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Contact Number" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="Interested Section" required />
            <input type="number" placeholder="Age" required />
            <input type="text" placeholder="Occupation" required />
            <button type="submit" className="submit-btn">Submit</button>
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
        <p><b>www.wetheyouth.com</b></p>
      </div>

      <div className="social-icons">
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
      </div>
    </div>
  );
};

export default TakeAction;