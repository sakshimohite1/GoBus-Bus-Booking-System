const express = require("express");
const Bus = require("../models/Bus");

const router = express.Router();

// Fetch Bus Details
router.get("/:busId", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Seat Status
router.post("/book-seat", async (req, res) => {
  const { busId, seat } = req.body;

  try {
    const bus = await Bus.findById(busId);
    if (!bus || bus.seats[seat] !== "available") {
      return res.status(400).json({ message: "Seat not available" });
    }

    bus.seats[seat] = "booked";
    await bus.save();
    res.json({ message: "Seat booked successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error booking seat" });
  }
});

module.exports = router;
