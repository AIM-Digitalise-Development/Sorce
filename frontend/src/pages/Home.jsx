import React from 'react';
import Banner from "../components/Banner"; 
import WhoWeAre from "../components/WhoWeAre";
import Facilities from "../components/Facilities";
import StatsSection from "../components/StatsSection";
import OurGallery from "../components/OurGallery";
import Section from "../components/Section";
import Communication from "../components/Communication";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <Banner />
      <WhoWeAre />
      {/* <Facilities /> */}
      {/* <StatsSection /> */}
      <Section />
       <Communication />
      <OurGallery />
      <Footer />
      <ScrollToTop />

      {/* ✅ WhatsApp Floating Bubble */}
      <a
        href="https://wa.me/919875680537?text=i%20have%20a%20query."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </a>
    </div>
  );
};

export default Home;
