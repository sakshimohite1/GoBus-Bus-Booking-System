import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const ConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get("paymentId");
  const amount = queryParams.get("amount");

  const handleDownloadBill = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("GoBus Booking Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Payment ID: ${paymentId}`, 20, 40);
    doc.text(`Amount Paid: ₹${amount}`, 20, 50);
    doc.text(`Thank you for booking with GoBus!`, 20, 70);
    doc.save("GoBus_Bill.pdf");
  };

  return (
    <div className="confirmation-container">
      <h2>🎉 Payment Successful!</h2>
      <p><strong>Payment ID:</strong> {paymentId}</p>
      <p><strong>Amount Paid:</strong> ₹{amount}</p>
      <button className="download-btn" onClick={handleDownloadBill}>
        📄 Download Bill
      </button>
    </div>
  );
};

export default ConfirmationPage;
