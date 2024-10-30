// FlightDetailPage.jsx
import React from "react";
import "./FlightDetailPage.css";

function FlightDetailPage() {
  return (
    <div className="flight-detail-page">
      {/* Back to Flights Button */}
      <div className="back-button">
        <a href="/">Back to Flights</a>
      </div>

      {/* Flight Title and Price */}
      <div className="flight-header">
        <h2>Emirates A380 Airbus</h2>
        <div className="flight-price">$240</div>
      </div>

      {/* Flight Image */}
      <div className="flight-image">
        <img src="flight-image.jpg" alt="Emirates A380 Airbus" />
      </div>

      {/* Flight Features */}
      <div className="features-section">
        <h3>Basic Economy Features</h3>
        <div className="features-list">
          <div className="feature-item">Economy</div>
          <div className="feature-item">One Carry-On</div>
          <div className="feature-item">In-Flight Entertainment</div>
          <div className="feature-item">Free WiFi</div>
          {/* Add other features as needed */}
        </div>
      </div>

      {/* Airline Policies */}
      <div className="policies-section">
        <h3>Emirates Airlines Policies</h3>
        <ul>
          <li>Free flight change, inclusive of select COVID filters.</li>
          <li>Free flight health screening for passengers.</li>
        </ul>
      </div>

      {/* Flight Schedule */}
      <div className="flight-schedule">
        <h3>Return Wed, Dec 8</h3>
        <div className="flight-details">
          <div className="time">
            <span>12:00 pm</span> <i className="fas fa-plane"></i>{" "}
            <span>3:30 pm</span>
          </div>
          <div className="duration">2h 23m</div>
          <div className="actions">
            <button className="action-button">
              <i className="fas fa-heart"></i>
            </button>
            <button className="action-button">
              <i className="fas fa-share"></i>
            </button>
            <button className="action-button">
              <i className="fas fa-thumbs-up"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <h4>Subscribe to Newsletter</h4>
        <p>Get travel updates, discounts, and tips right to your inbox.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default FlightDetailPage;
