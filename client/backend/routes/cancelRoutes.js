// routes/cancelRoutes.js
const express = require("express");
const router = express.Router();

// Simulate refund process (integration with Razorpay optional)
router.post("/cancel-ticket", async (req, res) => {
  const { ticketId, seats, phone } = req.body;

  if (!ticketId || !seats || !phone) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  // Optionally: Mark ticket as cancelled in DB

  // Refund logic (assume refund is successful)
  // For real use, integrate Razorpay's refund API here.

  try {
    await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS_API_KEY,
      message: `Your GoBus booking ${ticketId} has been cancelled. Refund of ₹${seats.length * 500} is initiated.`,
      numbers: [phone],
    });

    res.json({ success: true, message: "Ticket cancelled and refund initiated" });
  } catch (error) {
    console.error("Cancellation SMS error:", error);
    res.status(500).json({ success: false, message: "Cancellation failed" });
  }
});

module.exports = router;
