// routes/smsRoutes.js
const express = require("express");
const router = express.Router();
const fast2sms = require("fast-two-sms");

router.post("/send-ticket-sms", async (req, res) => {
  const { phone, name, busId, seats, boardingPoint, droppingPoint, totalFare } = req.body;

  if (!phone || !seats || !busId || !boardingPoint || !droppingPoint) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const message = `GoBus Booking Confirmed!\nName: ${name}\nBus: ${busId}\nSeats: ${seats.join(", ")}\nRoute: ${boardingPoint} to ${droppingPoint}\nFare: ₹${totalFare}\nThank you for booking with GoBus!`;

  try {
    await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS_API_KEY,
      message,
      numbers: [phone],
    });

    res.json({ success: true, message: "Ticket SMS sent!" });
  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ success: false, message: "Failed to send SMS" });
  }
});

module.exports = router;
