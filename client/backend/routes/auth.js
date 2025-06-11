require("dotenv").config();
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  try {
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY, // Load API key from .env
        message: `Your OTP is ${otp}`,
        language: "english",
        route: "otp",
        numbers: phone.replace("+91", ""), // ✅ Remove +91 before sending
        flash: 0, // ✅ Ensure flash is 0 for normal SMS
      },
    });

    console.log("Fast2SMS Response:", response.data); // ✅ Log API response

    if (response.data.return) {
      res.status(200).json({ message: "OTP sent successfully", otp }); // OTP sent successfully
    } else {
      res.status(500).json({ message: "Failed to send OTP", error: response.data.message });
    }
  } catch (error) {
    console.error("Fast2SMS Error:", error.response ? error.response.data : error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
});

module.exports = router;
