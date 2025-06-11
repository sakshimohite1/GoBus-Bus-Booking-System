import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const busRoutes = {
  "APSRTC (Andhra Pradesh SRTC)": [
    { from: "Hyderabad", to: "Vijayawada", fare: 450, buses: 5, firstBus: "06:00", lastBus: "22:00" },
    { from: "Hyderabad", to: "Tirupati", fare: 600, buses: 3, firstBus: "08:30", lastBus: "21:15" },
  ],
  "TSRTC (Telangana SRTC)": [
    { from: "Hyderabad", to: "Warangal", fare: 300, buses: 4, firstBus: "05:30", lastBus: "20:45" },
  ],
};

const BusDetails = () => {
  const { busName } = useParams();
  const navigate = useNavigate();
  const routes = busRoutes[busName] || [];

  return (
    <div className="bus-details-container">
      <h2>{busName} Bus Routes & Timings</h2>
      {routes.length === 0 ? (
        <p>No available routes</p>
      ) : (
        routes.map((route, index) => (
          <div key={index} className="route-card">
            <h3>{route.from} → {route.to}</h3>
            <p>Fare: ₹{route.fare}</p>
            <p>{route.buses} bus options</p>
            <p>First Bus: {route.firstBus}, Last Bus: {route.lastBus}</p>
            <button onClick={() => navigate(`/seat-selection/${busName}/${route.from}/${route.to}`)}>
              BOOK NOW
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BusDetails;
