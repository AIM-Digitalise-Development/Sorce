import React from 'react';
import { motion } from 'framer-motion';
// import logo1 from '../assets/logo1.png';
// import logo2 from '../assets/logo2.webp';
// import logo3 from '../assets/logo3.png';
// import logo4 from '../assets/logo4.png';
// import logo5 from '../assets/logo5.jpg';
// import logo6 from '../assets/logo6.png';
// import logo7 from '../assets/logo7.jpg';
// import logo8 from '../assets/logo8.webp';

const ClientLogos = () => {
  const logos = [ 
    "/assets/logo1.png",
    "/assets/logo2.webp",
    "/assets/logo3.png",
    "/assets/logo4.png",
    "/assets/logo5.jpg",
    "/assets/logo6.png",
    "/assets/logo7.jpg",
    "/assets/logo8.webp",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Valued Partners
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {logos.map((logo, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-center bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={logo} 
                alt={`client-logo-${index}`} 
                className="h-28 w-28 object-contain p-4"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;