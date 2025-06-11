const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Generate OTP and send via Fast2SMS
router.post("/send-otp", async (req, res) => {
    const { mobile } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    // Store OTP temporarily in user DB (optional)
    let user = await User.findOne({ mobile });
    if (!user) {
        user = new User({ mobile, otp }); // New user, save OTP
    } else {
        user.otp = otp; // Existing user, update OTP
    }
    await user.save();

    // ✅ Send OTP via Fast2SMS
    const fast2sms = require("fast-two-sms");
    await fast2sms.sendMessage({
        authorization: process.env.FAST2SMS_API_KEY,
        message: `Your OTP for login is ${otp}. Valid for 5 min.`,
        numbers: [mobile],
    });

    res.json({ success: true, message: "OTP sent successfully!" });
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ mobile });

    if (!user || user.otp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ mobile: user.mobile, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, message: "Login successful!" });
});

module.exports = router;
