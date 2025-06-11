const jwt = require("jsonwebtoken");
const User = require("../models/User"); // assuming you have this

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // Create or fetch user
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone }); // or include name if sent during signup
  }

  const token = jwt.sign({ id: user._id }, "secretKey");

  res.status(200).json({ success: true, token, user });
};
