const fast2sms = require("fast-two-sms");
const otpGenerator = require("otp-generator");

let otpStore = {}; // Temporary store

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

  otpStore[phone] = otp;

  try {
    const response = await fast2sms.sendMessage({
      authorization: "YOUR_FAST2SMS_API_KEY",
      message: `Your GoBus OTP is ${otp}`,
      numbers: [phone],
    });

    res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, error: "OTP sending failed" });
  }
};
