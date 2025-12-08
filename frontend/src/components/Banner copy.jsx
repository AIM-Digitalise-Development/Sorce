import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { image: "/assets/banner2.jpg", text: "Comfortable & Affordable Living" },
    { image: "/assets/gallery23.jpg", text: "Book Early Save More" },
    { image: "/assets/banner3.jfif", text: "Stay with Us, Feel at Home" }
  ];

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]); // Re-run effect whenever `currentIndex` changes

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <motion.img
          key={currentIndex} // Ensures smooth transition between images
          src={banners[currentIndex].image}
          alt="Banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-[60vh] object-cover" // Full width and fixed height (60vh)
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center text-center">
          <motion.h1
            key={banners[currentIndex].text} // Ensures smooth text transition
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl md:text-4xl font-semibold"
          >
            {banners[currentIndex].text}
          </motion.h1>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
      >
        <FaArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75"
      >
        <FaArrowRight size={24} />
      </button>
    </div>
  );
};

export default Banner;
