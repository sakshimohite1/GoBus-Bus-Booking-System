import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const seatLayout = [
  ["A1", "A2", "", "A3", "A4"],
  ["B1", "B2", "", "B3", "B4"],
  ["C1", "C2", "", "C3", "C4"],
  ["D1", "D2", "", "D3", "D4"],
  ["E1", "E2", "", "E3", "E4"],
];

const seatStatus = {
  A1: "available",
  A2: "male",
  A3: "unavailable",
  A4: "female",
  B1: "available",
  B2: "unavailable",
  B3: "male",
  B4: "available",
  C1: "available",
  C2: "available",
  C3: "unavailable",
  C4: "female",
  D1: "male",
  D2: "available",
  D3: "available",
  D4: "unavailable",
  E1: "female",
  E2: "available",
  E3: "available",
  E4: "male",
};

const SeatSelection = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (seatStatus[seat] !== "available") return;

    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed.");
      return;
    }
    const totalAmount = selectedSeats.length * seatPrice;
    navigate(`/payment?busId=${busId}&seats=${selectedSeats.join(",")}&amount=${totalAmount}`);
  };
  

  const seatPrice = 500;
  const totalAmount = selectedSeats.length * seatPrice;

  return (
    <div className="seats-container">
      <h2>🪑 Select Your Seats</h2>

      {/* Seat Legend */}
      <div className="seat-legend">
        <div className="legend-item"><span className="seat available"></span> Available</div>
        <div className="legend-item"><span className="seat unavailable"></span> Unavailable</div>
        <div className="legend-item"><span className="seat male"></span> Male</div>
        <div className="legend-item"><span className="seat female"></span> Female</div>
        <div className="legend-item"><span className="seat selected"></span> Selected</div>
      </div>

      {/* Seat Layout */}
      <div className="seat-layout">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) =>
              seat ? (
                <button
                  key={seat}
                  className={`seat ${seatStatus[seat]} ${selectedSeats.includes(seat) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seatStatus[seat] === "unavailable"}
                >
                  {seat}
                </button>
              ) : (
                <div key={`space-${rowIndex}-${seatIndex}`} className="seat-space"></div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Selected Seats Display */}
      <p className="selected-seats">
        Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
      </p>
      <p className="total-amount">
        Total Amount: ₹{selectedSeats.length > 0 ? totalAmount : "0"}
      </p>

      {/* Confirm Button */}
      <button className="confirm-btn" onClick={handleConfirmBooking} disabled={selectedSeats.length === 0}>
        Confirm Booking
      </button>
    </div>
  );
};

export default SeatSelection;
