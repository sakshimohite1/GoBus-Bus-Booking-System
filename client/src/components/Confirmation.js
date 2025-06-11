import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "./Confirmation.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const busId = queryParams.get("busId");
  const seats = queryParams.get("seats");
  const amount = queryParams.get("amount");

  const seatList = seats ? seats.split(",") : [];

  const downloadBill = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GoBus Booking Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Bus ID: ${busId}`, 20, 40);
    doc.text(`Seats: ${seatList.join(", ")}`, 20, 50);
    doc.text(`Total Amount: ₹${amount}`, 20, 60);
    doc.text(`Boarding Point: Your chosen boarding point`, 20, 70); // You can replace with real data
    doc.text(`Dropping Point: Your chosen dropping point`, 20, 80); // You can replace with real data
    doc.text("Thank you for booking with GoBus!", 20, 100);

    doc.save("GoBus_Booking_Confirmation.pdf");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when loaded
  }, []);

  return (
    <div className="confirmation-container">
      <h2>🎉 Booking Confirmed!</h2>
      <p>Your booking was successful. Here are your details:</p>

      <div className="booking-details">
        <p><strong>Bus ID:</strong> {busId}</p>
        <p><strong>Seats:</strong> {seatList.join(", ")}</p>
        <p><strong>Total Amount:</strong> ₹{amount}</p>
        <p><strong>Boarding Point:</strong> Your chosen boarding point</p>
        <p><strong>Dropping Point:</strong> Your chosen dropping point</p>
      </div>

      <button className="download-btn" onClick={downloadBill}>
        📄 Download Bill
      </button>
    </div>
  );
};

export default ConfirmationPage;
