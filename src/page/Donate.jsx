import React from "react";
import "../css/Donation.css";
import { makeGift } from "../components/donation";


const Donate = () => {
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
          Make a Gift
        </button>
      </div>

      {/* Quote */}
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
