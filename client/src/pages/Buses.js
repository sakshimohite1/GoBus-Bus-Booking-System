import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./Buses.css"; // Ensure styling is included

const dummyBusData = [
  {
    id: 1,
    name: "VRL Travels",
    departure: "10:00 AM",
    arrival: "4:30 PM",
    duration: "6h 30m",
    busType: "AC Sleeper",
    price: "₹500",
    seatsAvailable: 10,
  },
  {
    id: 2,
    name: "Shivneri",
    departure: "12:00 PM",
    arrival: "6:30 PM",
    duration: "6h 30m",
    busType: "AC Seater",
    price: "₹650",
    seatsAvailable: 5,
  },
  {
    id: 3,
    name: "SRS Travels",
    departure: "8:00 AM",
    arrival: "2:00 PM",
    duration: "6h",
    busType: "Non-AC Sleeper",
    price: "₹450",
    seatsAvailable: 8,
  },
  {
    id: 4,
    name: "KSRTC",
    departure: "6:30 AM",
    arrival: "1:00 PM",
    duration: "6h 30m",
    busType: "AC Sleeper",
    price: "₹700",
    seatsAvailable: 15,
  },
  {
    id: 5,
    name: "Orange Travels",
    departure: "9:15 AM",
    arrival: "3:45 PM",
    duration: "6h 30m",
    busType: "Non-AC Seater",
    price: "₹400",
    seatsAvailable: 12,
  },
  {
    id: 6,
    name: "Rajdhani Express",
    departure: "11:00 AM",
    arrival: "5:30 PM",
    duration: "6h 30m",
    busType: "AC Sleeper",
    price: "₹850",
    seatsAvailable: 6,
  },
  {
    id: 7,
    name: "Neeta Travels",
    departure: "1:00 PM",
    arrival: "7:30 PM",
    duration: "6h 30m",
    busType: "AC Sleeper",
    price: "₹750",
    seatsAvailable: 20,
  },
  {
    id: 8,
    name: "RedBus Special",
    departure: "3:00 PM",
    arrival: "9:30 PM",
    duration: "6h 30m",
    busType: "Luxury AC Seater",
    price: "₹950",
    seatsAvailable: 9,
  },
  {
    id: 9,
    name: "Jabbar Travels",
    departure: "5:30 PM",
    arrival: "11:59 PM",
    duration: "6h 29m",
    busType: "Non-AC Sleeper",
    price: "₹500",
    seatsAvailable: 7,
  },
  {
    id: 10,
    name: "VRL Premium",
    departure: "8:00 PM",
    arrival: "2:30 AM",
    duration: "6h 30m",
    busType: "AC Sleeper",
    price: "₹999",
    seatsAvailable: 5,
  },
];

const Buses = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");

  // ✅ Fix: Pass `bus` object instead of just `bus.id`
  const handleBookNow = (bus) => {
    const amount = bus.price.replace("₹", ""); // Remove ₹ symbol
    navigate(`/payment?amount=${amount}`);
  };

  return (
    <div className="bus-container">
      <h2>🚌 Available Buses</h2>
      <p>
        <strong>From:</strong> {from} → <strong>To:</strong> {to} on{" "}
        <strong>{date}</strong>
      </p>

      <table className="bus-table">
        <thead>
          <tr>
            <th>Bus Operator</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Duration</th>
            <th>Bus Type</th>
            <th>Seats Available</th>
            <th>Price</th>
            <th>Book Now</th>
          </tr>
        </thead>
        <tbody>
          {dummyBusData.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.name}</td>
              <td>{bus.departure}</td>
              <td>{bus.arrival}</td>
              <td>{bus.duration}</td>
              <td>{bus.busType}</td>
              <td>{bus.seatsAvailable}</td>
              <td>{bus.price}</td>
              <td>
                {/* ✅ Fix: Pass entire bus object */}
                <button className="book-btn" onClick={() => handleBookNow(bus)}>
                  Book Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Buses;
