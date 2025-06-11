import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBus, FaUserCircle } from "react-icons/fa"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from local storage)
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo & Name */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <FaBus className="bus-icon" />
          <span className="navbar-text">GoBus</span>
        </div>

        {/* Hamburger Menu (Only visible on mobile) */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        </div>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/help">Need Help?</Link></li>

          {/* Show User Profile if logged in */}
          {user ? (
            <li className="user-account">
              <FaUserCircle className="user-icon" />
              <span className="user-name">{user.name}</span>
            </li>
          ) : (
            <li><Link to="/login">Login/Signup</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
