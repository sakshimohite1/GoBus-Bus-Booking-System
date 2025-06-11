import React from "react";
import "./Offers.css"; // Ensure CSS is applied

const offers = [
  { text: "Get Rs.500 Off on 1st Booking", img: "/images/off.png" },
  { text: "Flat Rs.200 Off with ICICI Bank Credit Card", img: "/images/icic.png" },
  { text: "Save upto Rs.300 on APSRTC bookings", img: "/images/apsrtc offer.png" },
  { text: "Save upto Rs.300 on TGSRTC bookings", img: "/images/tgsrtc.png" },
  { text: "Save upto Rs.300 on KSRTC bookings", img: "/images/ksrtc.png" },
  { text: "Flat Rs.300 off with RBL Bank Credit Card", img: "/images/rbl.png" },
  { text: "Flat Rs.150 off with AU Bank Credit Card", img: "/images/au.png" },
  { text: "Save Upto Rs.200 with MobiKwik", img: "/images/mobikwik.png" },
  { text: "Flat 10% off via ixigo - AU Bank Credit Card", img: "/images/au.png" },
  { text: "Travel Party: Rs.250 off on group bookings", img: "/images/travel.png" },
];

const Offers = () => {
  return (
    <div className="offers-container">
      <h2>🎉 Bus Booking Discount Offers</h2>
      <ul className="offers-list">
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            {offer.img && <img src={offer.img} alt="Bank Logo" className="offer-logo" />}
            {offer.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Offers;
