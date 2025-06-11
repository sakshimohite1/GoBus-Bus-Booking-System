import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout">
      <h2>Booking Summary</h2>
      <button onClick={() => navigate("/payment")}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
