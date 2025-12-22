import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import AboutUsPage from "./pages/AboutUs";
import Activities from "./pages/Activities";
import Safety from "./pages/Safety";
import Review from "./components/Review/ReviewSlider";


// ✅ Logo Preloader Component
// ✅ Enhanced Logo Preloader Component
const LogoPreloader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 z-50 transition-opacity duration-700">
    {/* 🔹 Enlarged Logo with Animation */}
    <img src="/assets/logo.jpeg" alt="Loading..." 
         className="w-48 h-24 animate-pulse scale-100 transition-transform duration-500 ease-in-out" />
  </div>
);


// ✅ Page Wrapper to handle loading effect
const PageWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust duration
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LogoPreloader />}
      <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        {children}
      </div>
    </>
  );
};

// ✅ Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/review" element={<Review/>}/>
          </Routes>
        </PageWrapper>
      </div>
    </Router>
  );
}

export default App;
