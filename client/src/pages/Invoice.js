import React from "react";
import { savePDF } from "@progress/kendo-react-pdf";

const Invoice = ({ booking }) => {
  if (!booking) {
    return <div>No booking details available.</div>;
  }

  const { passengerName, busNo, from, to, date, time, price } = booking;

  // Function to convert number to words
  const numberToWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + " " + a[num % 10];
    if (num < 1000) return a[Math.floor(num / 100)] + " Hundred " + numberToWords(num % 100);
    return "Amount too large!";
  };

  const handleDownloadPDF = () => {
    savePDF(document.getElementById("invoice-pdf"), { paperSize: "A4" });
  };

  return (
    <div className="invoice-container">
      <div id="invoice-pdf" className="invoice">
        <h2>🚌 GoBus Ticket Invoice</h2>
        <p><strong>Main Office:</strong> 123, GoBus Street, Mumbai, India</p>
        <hr />
        <p><strong>Passenger Name:</strong> {passengerName}</p>
        <p><strong>Bus Number:</strong> {busNo}</p>
        <p><strong>From:</strong> {from} → <strong>To:</strong> {to}</p>
        <p><strong>Journey Date:</strong> {date} | <strong>Time:</strong> {time}</p>
        <p><strong>Amount Paid:</strong> ₹{price}</p>
        <p><strong>Amount in Words:</strong> {numberToWords(price)} Rupees Only</p>
        <button onClick={handleDownloadPDF}>Download Invoice</button>
      </div>
    </div>
  );
};

export default Invoice;
