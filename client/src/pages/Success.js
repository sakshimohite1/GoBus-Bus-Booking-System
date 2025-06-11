import React from "react";

const Success = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>✅ Payment Successful!</h2>
      <p>Your GoBus ticket has been booked.</p>
      <a href="/download-ticket">
        <button style={{ marginTop: "20px" }}>Download Ticket Again</button>
      </a>
    </div>
  );
};

export default Success;
