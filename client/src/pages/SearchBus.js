import React, { useState } from "react";
import "./SearchBus.css";

const SearchBus = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for buses from", from, "to", to, "on", date, "at", time);
  };

  return (
    <div className="search-bus-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button type="submit" className="search-btn">Search Buses</button>
      </form>
    </div>
  );
};

export default SearchBus;
