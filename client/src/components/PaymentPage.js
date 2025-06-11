import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedAmount = queryParams.get("amount");
  const seats = queryParams.get("seats");
  const busId = queryParams.get("busId");

  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    if (selectedAmount) {
      setTotalAmount(selectedAmount);
    }
  }, [selectedAmount]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    if (!totalAmount) {
      alert("No amount selected for payment.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/payment/pay", {
        amount: Number(totalAmount), // ✅ Ensure it's a number
      });
  
      const { id, currency, amount } = response.data;
  
      const options = {
        key: "rzp_test_1l6UEAfXClJ1iF", // ✅ Test key
        amount,
        currency,
        order_id: id,
        handler: function (response) {
          alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          navigate(`/confirmation?busId=${busId}&seats=${seats}&amount=${totalAmount}`);
        },
        prefill: {
          name: "Sakshi Mohite",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: function () {
            alert("⚠️ Payment popup closed by user.");
          }
        }
      };
  
      const rzp = new window.Razorpay(options);
  
      // ✅ Failure event handler
      rzp.on('payment.failed', function (response) {
        console.error("❌ Payment Failed:", response.error);
        alert(`❌ Payment failed.\nReason: ${response.error.description}`);
      });
  
      rzp.open();
    } catch (error) {
      console.error("❌ Error calling /pay:", error);
      alert("⚠️ Payment failed. Please try again.");
    }
  };
  
  return (
    <div className="payment-container">
      <h2>💳 Choose Payment Method</h2>

      <div className="amount-card">
        <p>Total Amount:</p>
        <h3>{totalAmount ? `₹${totalAmount}` : "Not Selected"}</h3>
      </div>

      <button className="pay-now-btn" onClick={handleRazorpayPayment} disabled={!totalAmount}>
        Pay with Razorpay
      </button>

      <div className="divider"><span>OR</span></div>

      <div className="upi-container">
        <h3>Scan & Pay with UPI (Google Pay, PhonePe, Paytm)</h3>
        <img src="/images/qr.png" alt="Scan QR Code to Pay" className="qr-code" />
        <p>Scan this QR Code using any UPI app to complete your payment.</p>
      </div>
    </div>
  );
};

export default PaymentPage;
