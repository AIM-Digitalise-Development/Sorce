import React from 'react';

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/Footer";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

// Import Assets
// import mep from "../assets/mep.jpg";
// import interior from "../assets/interior.jpg";
// import facade from "../assets/facade.jpg";
// import logo1 from "../assets/logo1.png";
// import logo2 from "../assets/logo2.webp";
// import logo3 from "../assets/logo3.png";
// import logo4 from "../assets/logo4.png";
// import logo5 from "../assets/logo5.jpg";
// import logo6 from "../assets/logo6.png";
// import logo7 from "../assets/logo7.jpg";
// import logo8 from "../assets/logo8.webp";

const testimonials = [
  { id: 1, name: "Rahul", text: "Great service! Highly professional team." },
  { id: 2, name: "Atif", text: "They delivered exactly what we wanted!" },
  { id: 3, name: "Saurav", text: "The best experience working with them." },
];

const clients = [
  "/assets/logo1.png",
  "/assets/logo2.webp",
  "/assets/logo3.png",
  "/assets/logo4.png",
  "/assets/logo5.jpg",
  "/assets/logo6.png",
  "/assets/logo7.jpg",
  "/assets/logo8.webp",
];


const ClientPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[40vh] sm:h-[60vh] bg-black flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 sm:px-10 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-white max-w-lg"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Our Trusted Clients</h1>
          <p className="text-sm sm:text-lg">We partner with the best brands to deliver exceptional results.</p>
          <button className="mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
            Explore Clients
          </button>
        </motion.div>
        <motion.div className="w-full sm:w-1/2 h-full rounded-lg shadow-2xl overflow-hidden mt-4 sm:mt-0">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop={true} className="w-full h-full">
            {["/assets/MEP.jpg", "/assets/facade.jpg", "/assets/interior.jpg"].map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="Showcase" className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto my-10 sm:my-20 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">What Our Clients Say</h2>
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} className="w-full max-w-lg mx-auto">
          {testimonials.map((testi) => (
            <SwiperSlide key={testi.id} className="p-4 sm:p-6 bg-white shadow-lg rounded-lg">
              <p className="text-sm sm:text-lg italic">&quot;{testi.text}&quot;</p>
              <h3 className="mt-2 sm:mt-4 text-lg sm:text-xl font-semibold">{testi.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Client Logos */}
      <div className="container mx-auto my-10 sm:my-20 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Our Clients</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
          {clients.map((logo, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} className="p-2 bg-white shadow-lg rounded-lg flex items-center justify-center">
              <img src={logo} alt={`Client ${index + 1}`} className="w-16 sm:w-24 h-16 sm:h-24 object-contain" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call-To-Action */}
      <div className="bg-blue-600 text-white text-center py-10 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Ready to Work with Us?</h2>
        <p className="text-sm sm:text-lg mb-4">Let’s build something amazing together.</p>
        <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-600 font-bold rounded-md text-sm sm:text-lg hover:bg-gray-100 transition">
          Contact Us
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClientPage;
