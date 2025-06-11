import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const busId = queryParams.get("busId");
  const seats = queryParams.get("seats")?.split(",") || [];
  const amount = queryParams.get("amount");
  const name = queryParams.get("name");
  const email = queryParams.get("email");
  const boardingPoint = queryParams.get("from");
  const droppingPoint = queryParams.get("to");

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_1l6UEAfXClJ1iF", // Replace with your actual Razorpay key
      amount: amount * 100,
      currency: "INR",
      name: "GoBus",
      description: "Bus Ticket Payment",
      handler: function (response) {
        alert("Payment Successful ✅");
        generatePDF();
        window.location.href = "/success"; // redirect after PDF download
      },      
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("GoBus e-Ticket", 80, 15);

    doc.setFontSize(12);
    doc.text(`Ticket ID: ${Math.floor(Math.random() * 1000000)}`, 15, 30);
    doc.text(`Bus ID: ${busId}`, 15, 40);
    doc.text(`Passenger: ${name}`, 15, 50);
    doc.text(`Email: ${email}`, 15, 60);
    doc.text(`Journey: ${boardingPoint} to ${droppingPoint}`, 15, 70);
    doc.text(`Reporting Time: 06:55 PM`, 15, 80);
    doc.text(`Total Fare: ₹${amount}`, 15, 90);
    doc.text(`Payment Status: Paid`, 15, 100);

    autoTable(doc, {
      startY: 110,
      head: [["Seat Number(s)", "Amount"]],
      body: seats.map((seat) => [seat, `₹500`]),
    });

    doc.save("GoBus-Ticket.pdf");
  };

  return (
    <div className="payment-container">
      <h2>💳 Complete Your Payment</h2>

      <div className="summary-card">
        <p><strong>Passenger:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>From:</strong> {boardingPoint}</p>
        <p><strong>To:</strong> {droppingPoint}</p>
        <p><strong>Selected Seats:</strong> {seats.join(", ")}</p>
        <p><strong>Total Amount:</strong> ₹{amount}</p>
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
