const fast2sms = require("fast-two-sms");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ success: false, message: "Phone number is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await User.findOneAndUpdate({ phone }, { otp }, { upsert: true });

    await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS_API_KEY,
      message: `Your OTP for GoBus is ${otp}`,
      numbers: [phone],
    });

    res.json({ success: true, message: "OTP Sent!" });
  } catch (err) {
    console.error("❌ OTP Send Error:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) return res.status(400).json({ success: false, message: "Phone and OTP are required" });

  try {
    const user = await User.findOne({ phone, otp });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }

    const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token, user: { phone }, message: "Login Successful!" });
  } catch (err) {
    console.error("❌ OTP Verification Error:", err);
    res.status(500).json({ success: false, message: "Server error during OTP verification" });
  }
};
