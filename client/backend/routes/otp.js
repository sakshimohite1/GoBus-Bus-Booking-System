// routes/otp.js
const express = require("express");
const router = express.Router();
const fast2sms = require("fast-two-sms");
const OTPModel = require("../models/OTP"); // if you're storing OTP
require("dotenv").config();

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  try {
    const response = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS_API_KEY,
      message: `Your GoBus OTP is ${otp}`,
      numbers: [phone],
    });

    console.log("📤 OTP Sent Response:", response);

    // Save to DB or in-memory
    // await OTPModel.create({ phone, otp });

    res.json({ success: true, message: "OTP sent", otp }); // you can hide OTP in prod
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

module.exports = router;
