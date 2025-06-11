import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import apsrtcLogo from "../assets/apsrtc.png";
import tsrtcLogo from "../assets/tsrtc.png";
import ksrtcLogo from "../assets/ksrtc.png";
import msrtcLogo from "../assets/msrtc.png";
import gsrtcLogo from "../assets/gsrtc.png";
import rsrtcLogo from "../assets/rsrtc.png";
import upsrtcLogo from "../assets/upsrtc.png";
import hrtcLogo from "../assets/hrtc.png";
import mprtclogo from "../assets/mprtc.png";
import osrtcLogo from "../assets/osrtc.png";
import wbsrtcLogo from "../assets/wbsrtc.png";

const srtcBuses = [
  { id: "apsrtc", logo: apsrtcLogo, name: "APSRTC (Andhra Pradesh SRTC)" },
  { id: "tsrtc", logo: tsrtcLogo, name: "TSRTC (Telangana SRTC)" },
  { id: "ksrtc", logo: ksrtcLogo, name: "KSRTC (Karnataka SRTC)" },
  { id: "msrtc", logo: msrtcLogo, name: "MSRTC (Maharashtra SRTC)" },
  { id: "gsrtc", logo: gsrtcLogo, name: "GSRTC (Gujarat SRTC)" },
  { id: "rsrtc", logo: rsrtcLogo, name: "RSRTC (Rajasthan SRTC)" },
  { id: "upsrtc", logo: upsrtcLogo, name: "UPSRTC (Uttar Pradesh SRTC)" },
  { id: "hrtc", logo: hrtcLogo, name: "HRTC (Himachal Pradesh SRTC)" },
  { id: "mprtc", logo: mprtclogo, name: "MPRTC (Madhya Pradesh RTC)" },
  { id: "osrtc", logo: osrtcLogo, name: "OSRTC (Odisha SRTC)" },
  { id: "wbsrtc", logo: wbsrtcLogo, name: "WBSRTC (West Bengal SRTC)" },
];

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      alert("Please enter all details!");
      return;
    }
    setShowPassengerForm(true);
  };

  const handleProceed = () => {
    if (!name || !email || !mobile) {
      alert("Please fill in passenger details.");
      return;
    }
    navigate(`/buses?from=${from}&to=${to}&date=${date}&name=${name}&email=${email}&mobile=${mobile}`);
  };

  const handleSRTCBusClick = (busId, busName) => {
    navigate(`/srtc-buses/${busId}?name=${encodeURIComponent(busName)}`);
  };

  return (
    <div className="home-container">
      {/* Search Bus Section */}
      <div className="search-bus-section">
        <h2>Search for Buses</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter city"
            />
          </div>
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter city"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit" className="search-btn">Search Bus</button>
        </form>

        {/* Passenger Details Form */}
        {showPassengerForm && (
          <div className="passenger-details-form" style={{ marginTop: "20px", background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
            <h3>Passenger Details</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={handleProceed}>Proceed to Buses</button>
          </div>
        )}
      </div>

      {/* SRTC Section */}
      <div className="gov-buses-section">
        <h2>SRTC (State Road Transport Corporations)</h2>
        <div className={`gov-buses-list ${showAll ? "expanded" : ""}`}>
          {srtcBuses.map((bus) => (
            <div
              key={bus.id}
              className="bus-card"
              onClick={() => handleSRTCBusClick(bus.id, bus.name)}
              style={{ cursor: "pointer" }}
            >
              <img src={bus.logo} alt={bus.name} />
              <p>{bus.name}</p>
            </div>
          ))}
        </div>
        <button className="view-all-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "View Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default Home;
