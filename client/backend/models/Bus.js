const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  seats: [{ seatNumber: Number, isBooked: Boolean }]
});

module.exports = mongoose.model("Bus", BusSchema);
