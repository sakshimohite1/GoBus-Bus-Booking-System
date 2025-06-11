import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AvailableBuses.css";

const AvailableBuses = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract search query (from, to, date) from URL
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from");
    const to = queryParams.get("to");
    const date = queryParams.get("date");

    // Fetch available buses from backend
    fetch(`http://localhost:5000/api/buses?from=${from}&to=${to}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error("Error fetching buses:", err));
  }, [location.search]);

  return (
    <div className="available-buses">
      <h2>Available Buses</h2>
      {buses.length === 0 ? (
        <p>No buses available for the selected route.</p>
      ) : (
        buses.map((bus) => (
          <div className="bus-card" key={bus._id}>
            <h3>{bus.name}</h3>
            <p><strong>Type:</strong> {bus.type} ({bus.ac ? "AC" : "Non-AC"})</p>
            <p><strong>Number Plate:</strong> {bus.numberPlate}</p>
            <p><strong>Departure:</strong> {bus.departureTime} | <strong>Arrival:</strong> {bus.arrivalTime}</p>
            <p><strong>Fare:</strong> ₹{bus.fare}</p>
            <p><strong>Available Seats:</strong> {bus.availableSeats}</p>
            <button onClick={() => navigate(`/seat-selection?busId=${bus._id}`)}>Select Seats</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AvailableBuses;
