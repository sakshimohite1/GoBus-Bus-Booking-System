import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Offers from "./components/Offers";
import WhyChoose from "./components/WhyChoose";

import Home from "./pages/Home";
import BusDetails from "./pages/BusDetails";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import AvailableBuses from "./pages/AvailableBuses";
import Buses from "./pages/Buses";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import SrtcBuses from "./pages/SrtcBuses";
import ConfirmationPage from "./components/Confirmation";
import Success from "./pages/Success";
import OTPLogin from "./components/OTPLogin"; // ✅ using OTP Login only

function Layout({ children }) {
  const location = useLocation();

  // Hide navbar/footer on specific routes
  const hideExtras = ["/payment", "/checkout", "/confirmation", "/invoice"].includes(location.pathname);

  return (
    <>
      {!hideExtras && <Navbar />}
      <ScrollToTop />

      {children}

      {!hideExtras && (
        <>
          <Offers />
          <WhyChoose />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bus-details/:busName" element={<BusDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/available-buses" element={<AvailableBuses />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/why-choose" element={<WhyChoose />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/srtc-buses/:busId" element={<SrtcBuses />} />
          <Route path="/seat-selection/:busId" element={<SeatSelection />} />
          <Route path="/login" element={<OTPLogin />} /> 
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
