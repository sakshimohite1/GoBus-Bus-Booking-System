const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// ✅ Use Razorpay test credentials here
const razorpay = new Razorpay({
  key_id: 'rzp_test_1l6UEAfXClJ1iF',     // Your test Key ID
  key_secret: '9oKhRflPdEU45VLeXoC6hCAQ' // Your test Key Secret
});

router.post('/pay', async (req, res) => {
  try {
    const { amount } = req.body;

    // Basic validation
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    // Razorpay order options
    const options = {
      amount: Math.round(amount * 100), // ₹ to paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1, // Auto capture after payment
    };

    // Create order
    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay Order Created:", order);

    return res.status(200).json(order);

  } catch (error) {
    console.error("❌ Razorpay Order Creation Error:", error);
    return res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

module.exports = router;
