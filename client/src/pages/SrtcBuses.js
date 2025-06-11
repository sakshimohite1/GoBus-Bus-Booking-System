import React from "react";
import { useNavigate } from "react-router-dom";
import "./SrtcBuses.css";

const availableBuses = [
  { id: 1, name: "SRTC Express", time: "9:00 AM", price: "₹500" },
  { id: 2, name: "SRTC SuperFast", time: "12:30 PM", price: "₹600" },
  { id: 3, name: "SRTC Deluxe", time: "3:00 PM", price: "₹300" },
  { id: 4, name: "SRTC AC", time: "6:00 PM", price: "₹650" },
  { id: 5, name: "SRTC Sleeper", time: "9:30 PM", price: "₹450" },
  { id: 6, name: "SRTC Night Express", time: "11:45 PM", price: "₹550" }
];

const SrtcBuses = () => {
  const navigate = useNavigate();

  const handleSeatSelection = (busId) => {
    navigate(`/seat-selection/${busId}`);
  };

  return (
    <div className="srtc-buses-container">
      <h2>🚍 Available Buses for MSRTC (Maharashtra SRTC)</h2>
      <table className="bus-table">
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Time</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availableBuses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.name}</td>
              <td>{bus.time}</td>
              <td>{bus.price}</td>
              <td>
                <button className="select-seat-btn" onClick={() => handleSeatSelection(bus.id)}>
                  Select Seats
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SrtcBuses;
