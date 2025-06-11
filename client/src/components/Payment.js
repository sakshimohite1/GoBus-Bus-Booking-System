import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Payment = () => {
  const [searchParams] = useSearchParams();

  const amount = searchParams.get("amount");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const seats = searchParams.get("seats");

  return (
    <div style={{ background: "#f0f4f8", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "white", padding: 30, borderRadius: 12, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: 20 }}>💳 Complete Your Payment</h3>
        <div style={{ marginBottom: 20 }}>
          <p><strong>Passenger:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>From:</strong> {from}</p>
          <p><strong>To:</strong> {to}</p>
          <p><strong>Selected Seats:</strong> {seats}</p>
          <p><strong>Total Amount:</strong> ₹{amount}</p>
        </div>
        <button
          style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 6 }}
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Payment;
