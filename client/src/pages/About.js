import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>About GoBus</h2>
      <p>
        Welcome to <strong>GoBus</strong>, your reliable and efficient bus ticket booking platform.
        We aim to provide a seamless and hassle-free experience for travelers across India.
      </p>
      <h3>Why Choose Us?</h3>
      <ul>
        <li>✔ Easy & Fast Bus Booking</li>
        <li>✔ Secure Online Payments</li>
        <li>✔ 24/7 Customer Support</li>
        <li>✔ Verified Bus Operators</li>
      </ul>
      <p>Book your bus tickets with us and enjoy a smooth journey!</p>
    </div>
  );
};

export default About;
