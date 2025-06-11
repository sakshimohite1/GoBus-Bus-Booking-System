require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// External Route Files
const sendEmailRoutes = require("./routes/sendEmail");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const smsRoutes = require("./routes/smsRoutes");
const cancelRoutes = require("./routes/cancelRoutes");
const otpRoutes = require("./routes/otpRoutes"); // 👈 NEW OTP routes

const app = express();

// 🔐 Middlewares
app.use(cors());
app.use(bodyParser.json());

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/email", sendEmailRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/cancel", cancelRoutes);
app.use("/api/otp", otpRoutes); // 👈 use this for /send-otp and /verify-otp

// 📦 Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🌐 Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
