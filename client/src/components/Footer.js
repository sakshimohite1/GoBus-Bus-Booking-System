import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About GoBus */}
        <div className="footer-section about">
          <h3>About GoBus</h3>
          <p>GoBus is a trusted online bus ticket booking platform providing a hassle-free travel experience.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        {/* Policies */}
        <div className="footer-section">
          <h3>Policies</h3>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        {/* Our Business */}
        <div className="footer-section">
          <h3>Our Business</h3>
          <Link to="/operators">Bus Operators</Link>
          <Link to="/routes">Top Routes</Link>
          <Link to="/management">Our Management</Link>
        </div>

        {/* Contact */}
        <div className="footer-section contact">
          <h3>Connect with Us</h3>
          <p>Email: support@gobus.com</p>
          <p>Phone: +91 8452 985397</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 GoBus. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
