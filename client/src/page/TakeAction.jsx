import React, { useState } from "react";
import "../css/takeAction.css";

const TakeAction = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    interestedSection: "",
    age: "",
    occupation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/takeactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        alert(data?.message || "Thank you for registering as a Volunteer!");
        setShowForm(false);
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          address: "",
          interestedSection: "",
          age: "",
          occupation: "",
        });
      } else {
        alert(data?.error || "Error submitting form.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Error submitting form. Check console.");
    }
  };

  return (
    <div className="take-action">
      {/* Banner */}
      <section className="quote-bar">
        <h2 className="heading">Take Action - Be a Volunteer</h2>
      </section>

      {/* Button to show form */}
      {!showForm && (
        <button className="register-btn" onClick={() => setShowForm(true)}>
          Register as Volunteer
        </button>
      )}

      {/* Volunteer Form */}
      {showForm && (
        <div className="form-container">
          <h3>Volunteer Registration Form</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Interested Section"
              name="interestedSection"
              value={formData.interestedSection}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* ✅ Two-column section */}
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

      {/* ✅ Info section */}
      <div className="info">
        <p>
          We have over <b>3000+ volunteers</b> across Bangladesh committed to help
          during environmental challenges, mental health issues, and other emergencies.
        </p>
        <p><b>www.wetheyouth.com</b></p>
      </div>

      {/* ✅ Social icons */}
      <div className="social-icons">
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
      </div>
    </div>
  );
};

export default TakeAction;
