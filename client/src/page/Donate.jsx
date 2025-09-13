import React, { useState } from "react";
import "../css/Donation.css";

const Donate = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    section: "",
    message: "",
    phone: "",
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
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Only parse JSON if response has JSON content
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (res.ok) {
        alert(data?.message || "Thank you for your donation!");
        setShowForm(false);

        // Clear form fields
        setFormData({ name: "", amount: "", section: "", message: "", phone: "" });
      } else {
        alert(data?.error || "Error submitting donation.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting donation. Check console.");
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
        <button className="donate-btn" onClick={() => alert("Redirect to payment")}>
          Make a Gift
        </button>

        <button 
          className="donate-btn" 
          style={{ background: "#e63946", marginLeft: "10px" }}
          onClick={() => setShowForm(true)}
        >
          Open Donation Form
        </button>
      </div>

      {/* Donation Form */}
      {showForm && (
        <div className="form-container">
          <h3>Donation Form</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              placeholder="Donation Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            {/* Section / Cause dropdown */}
            <select
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
            </select>

            <input
              type="text"
              placeholder="Message / Note"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Submit Donation
            </button>
          </form>
        </div>
      )}

      <div className="quote">
        “Be the light in someone’s darkest moment. Donate today & make an impact.”
      </div>

      {/* Footer */}
      <footer>
        <p>
          <a href="https://www.wetheyouth.com" target="_blank" rel="noreferrer">
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
