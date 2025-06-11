const express = require("express");
const router = express.Router();
const axios = require("axios");

// Store OTPs temporarily (use Redis/DB in production)
const otpStorage = {};

// Send OTP via Fast2SMS
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage[phone] = otp;

  try {
    await axios.post("https://www.fast2sms.com/dev/bulkV2", {
      route: "otp",
      variables_values: otp,
      numbers: phone,
    }, {
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
      },
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStorage[phone] && otpStorage[phone] == otp) {
    delete otpStorage[phone]; // OTP used, remove it
    res.json({ success: true, message: "OTP verified" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
