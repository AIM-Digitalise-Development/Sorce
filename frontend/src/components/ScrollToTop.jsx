import { useState, useEffect } from "react";
import React from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-gray-800/60 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:bg-gray-900/80 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      ⬆
    </button>
  );
};

export default ScrollToTop;
