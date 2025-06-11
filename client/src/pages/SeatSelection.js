import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./SeatSelection.css";

const seatLayout = [
  ["A1", "A2", "", "A3", "A4"],
  ["B1", "B2", "", "B3", "B4"],
  ["C1", "C2", "", "C3", "C4"],
  ["D1", "D2", "", "D3", "D4"],
  ["E1", "E2", "", "E3", "E4"],
  ["F1", "F2", "", "F3", "F4"],
  ["G1", "G2", "", "G3", "G4"],
  ["H1", "H2", "", "H3", "H4"],
  ["I1", "I2", "", "I3", "I4"],
  ["J1", "J2", "", "J3", "J4"],
];

const bookedSeats = ["A1", "B3", "C2", "D4", "E1", "F3", "H2", "J1"];

const SeatSelection = () => {
  const seatPrice = 500;
  const { busId } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");

  const toggleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const totalAmount = selectedSeats.length * seatPrice;

  const handleProceed = () => {
    if (
      selectedSeats.length === 0 ||
      !customerName ||
      !customerEmail ||
      !boardingPoint ||
      !droppingPoint
    ) {
      alert("Please fill all details and select seats.");
      return;
    }

    generatePDF();
    navigate(
      `/payment?busId=${busId}&seats=${selectedSeats.join(",")}&amount=${totalAmount}&name=${encodeURIComponent(
        customerName
      )}&email=${encodeURIComponent(
        customerEmail
      )}&from=${boardingPoint}&to=${droppingPoint}`
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("GoBus e-Ticket", 80, 15);

    doc.setFontSize(12);
    doc.text(`Ticket ID: ${Math.floor(Math.random() * 1000000)}`, 15, 30);
    doc.text(`Bus ID: ${busId}`, 15, 40);
    doc.text(`Passenger: ${customerName}`, 15, 50);
    doc.text(`Email: ${customerEmail}`, 15, 60);
    doc.text(`Journey: ${boardingPoint} to ${droppingPoint}`, 15, 70);
    doc.text(`Reporting Time: 06:55 PM`, 15, 80);
    doc.text(`Total Fare: ₹${totalAmount}`, 15, 90);
    doc.text(`Payment Status: Paid`, 15, 100);

    autoTable(doc, {
      startY: 110,
      head: [["Seat Number(s)", "Amount"]],
      body: selectedSeats.map((seat) => [seat, `₹${seatPrice}`]),
    });

    doc.save("GoBus-Ticket.pdf");
  };

  return (
    <div className="seat-container">
      <h2>🎟 Select Your Seats</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Boarding Point"
          value={boardingPoint}
          onChange={(e) => setBoardingPoint(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dropping Point"
          value={droppingPoint}
          onChange={(e) => setDroppingPoint(e.target.value)}
        />
      </div>

      <div className="seat-layout">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${bookedSeats.includes(seat) ? "booked" : ""} ${
                  selectedSeats.includes(seat) ? "selected" : ""
                }`}
                onClick={() => toggleSeatSelection(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="seat-info">
        <div className="legend">
          <span className="seat available"></span> Available
          <span className="seat booked"></span> Booked
          <span className="seat selected"></span> Selected
        </div>
      </div>

      <div className="total-price">
        <strong>Total Amount: </strong>
        {selectedSeats.length > 0 ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            ₹{totalAmount}
          </span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Not Selected
          </span>
        )}
      </div>

      <button className="proceed-btn" onClick={handleProceed}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default SeatSelection;
