import React from "react";
import "./WhyChoose.css"; // Import CSS for styling

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <h2>Why Choose GoBus for Bus Ticket Booking?</h2>
      <p>GoBus is India’s fastest-growing online ticket booking platform, partnering with 4000+ private and government bus operators across 3,50,000+ routes.</p>
      
      <div className="features">
        <div className="feature-box">
          <h3>3,50,000+ Bus Routes</h3>
          <p>Offering unparalleled choices for your travel needs.</p>
        </div>
        <div className="feature-box">
          <h3>4000+ Bus Partners</h3>
          <p>Ranging from State RTCs to private partners.</p>
        </div>
        <div className="feature-box">
          <h3>Fastest Bus Booking</h3>
          <p>Swift and seamless bus ticket booking experience.</p>
        </div>
        <div className="feature-box">
          <h3>24/7 Customer Support</h3>
          <p>Available for all your bus booking needs.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
