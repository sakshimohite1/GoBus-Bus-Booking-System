// SrtcSelector.js (new component or part of Home.js)

import React from "react";
import { useNavigate } from "react-router-dom";
import "./SrtcSelector.css"; // Optional styling

const SrtcSelector = () => {
  const navigate = useNavigate();

  const handleClick = (srtcName) => {
    navigate(`/srtc-buses/${srtcName}`); // Navigate to dynamic route like /srtc-buses/msrtc
  };

  return (
    <div className="srtc-selector-container">
      <h2>Select State Transport Corporation</h2>
      <div className="button-group">
        <button onClick={() => handleClick("msrtc")}>MSRTC</button>
        <button onClick={() => handleClick("ksrtc")}>KSRTC</button>
        <button onClick={() => handleClick("apsrtc")}>APSRTC</button>
      </div>
    </div>
  );
};

export default SrtcSelector;
