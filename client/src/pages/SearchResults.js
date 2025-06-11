import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

const busData = [
  { id: 1, name: "VRL Travels", time: "10:00 AM", price: 500 },
  { id: 2, name: "SRS Travels", time: "12:30 PM", price: 600 },
  { id: 3, name: "KSRTC", time: "2:00 PM", price: 550 }
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");

  const handleSelectBus = (busId) => {
    // ✅ Redirect to Seat Selection Page
    navigate(`/select-seat?busId=${busId}&from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="results-container">
      <h2>Buses from {from} to {to} on {date}</h2>
      {busData.length > 0 ? (
        <ul>
          {busData.map((bus) => (
            <li key={bus.id}>
              <div className="bus-info">
                <h3>{bus.name}</h3>
                <p>Departure: {bus.time}</p>
                <p>Fare: ₹{bus.price}</p>
              </div>
              <button onClick={() => handleSelectBus(bus.id)}>Select Bus</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No buses available for this route.</p>
      )}
    </div>
  );
};

export default SearchResults;
