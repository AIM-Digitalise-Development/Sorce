import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFileContract,
  FaHospitalAlt,
  FaXRay,
  FaUserMd,
  FaTools,
  FaTimes,
} from "react-icons/fa";

const WhoWeAre = () => {
  const images = [
    "/assets/gallery1.png",
    "/assets/gallery28.png",
    "/assets/gallery29.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const hoverTimeoutRef = useRef(null);
  const modalTimeoutRef = useRef(null);
  const modalRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const services = [
    {
      icon: <FaFileContract className="text-yellow-400" />,
      text: "All required licenses: Clinical Establishment, Fire NOC, Pollution certificate, Biomedical Waste, PCPNDT & more"
    },
    {
      icon: <FaHospitalAlt className="text-blue-400" />,
      text: "Hospital planning & facility setup with full construction work and optimized layouts, Manpower Services: Permanent and contractual support with trained medical and administrative staff"
    },
    {
      icon: <FaXRay className="text-green-400" />,
      text: "Medical Equipments: Diagnostic & Imaging Equipment- X-Ray Machines (Digital, Portable) CR & DR Systems,Critical Care & Life Support Equipment Ventilators (Adult / Neonatal) Patient Monitors (Multipara) & much more."
    },
    {
      icon: <FaTools className="text-red-400" />,
      text: "Annual Maintenance: Full responsibility for licenses, machinery upkeep, calibration, and compliance"
    }
  ];

  const galleries = [
    [
      { src: "/assets/gallery1.png", caption: "Licensing & Compliance - Step 1" },
      { src: "/assets/gallery28.png", caption: "Document Preparation" },
      { src: "/assets/gallery29.png", caption: "Approval & Renewal" },
    ],
    [
      { src: "/assets/gallery28.png", caption: "Site Planning & Layout" },
      { src: "/assets/gallery29.png", caption: "Construction Workflow" },
      { src: "/assets/gallery1.png", caption: "Ready Facility" },
    ],
    [
      { src: "/assets/gallery29.png", caption: "Diagnostic Equipment Setup" },
      { src: "/assets/gallery1.png", caption: "Imaging Calibration" },
      { src: "/assets/gallery28.png", caption: "Testing & Delivery" },
    ],
    [
      { src: "/assets/gallery1.png", caption: "Preventive Maintenance" },
      { src: "/assets/gallery28.png", caption: "Calibration & Service" },
      { src: "/assets/gallery29.png", caption: "Compliance Checks" },
    ],
  ];

  // Handle hover on desktop - FASTER (200ms instead of 800ms)
  const handleMouseEnter = (index) => {
    if (!isMobile) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        openModal(index);
      }, 200); // Reduced from 800ms to 200ms
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  // Handle modal mouse events for auto-close
  const handleModalMouseEnter = () => {
    if (!isMobile && modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
    }
  };

  const handleModalMouseLeave = () => {
    if (!isMobile) {
      // Start closing timer when mouse leaves modal
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }
      modalTimeoutRef.current = setTimeout(() => {
        setModalOpen(false);
      }, 300); // Close after 300ms of leaving modal
    }
  };

  // Handle click on mobile
  const handleClick = (index) => {
    if (isMobile) {
      openModal(index);
    }
  };

  // Open modal for a service
  const openModal = (index) => {
    setActiveService(index);
    setModalIndex(0);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Auto-advance carousel in modal
  useEffect(() => {
    if (!modalOpen) return;
    const len = galleries[activeService].length;
    const id = setInterval(() => {
      setModalIndex((i) => (i + 1) % len);
    }, 3000);
    return () => clearInterval(id);
  }, [modalOpen, activeService]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-6 lg:px-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <div className="relative w-full lg:w-[420px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-700">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-[250px] sm:h-[320px] md:h-[360px]"
          >
            <img
              src={images[currentIndex]}
              alt="Hospital Gallery"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-400 bg-clip-text text-transparent">
            Building Modern Hospitals
          </h2>
          <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
            "Quality Care Begins with the Right Foundation."
          </p>

          {/* Services List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }} // Faster transition
                className={`flex items-start gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-sm transition-all duration-200 cursor-pointer ${
                  !isMobile ? 'hover:shadow-md hover:bg-white/10' : ''
                }`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => isMobile && handleClick(index)}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.2 }} // Faster icon animation
                  className="text-2xl mt-1"
                >
                  {item.icon}
                </motion.div>
                <p className="text-sm text-gray-200">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Button */}
      <div className="text-center mt-10">
        <Link
          to="/contact"
          className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
        >
          Make an Enquiry
        </Link>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
          onMouseEnter={handleModalMouseEnter}
          onMouseLeave={handleModalMouseLeave}
          ref={modalRef}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-2xl max-w-2xl w-full overflow-hidden relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleModalMouseEnter}
            onMouseLeave={handleModalMouseLeave}
          >
            <button
              className="absolute top-3 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
              onClick={closeModal}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col">
              <div className="w-full h-[240px] md:h-[260px] relative overflow-hidden">
                <motion.img
                  key={galleries[activeService][modalIndex].src}
                  src={galleries[activeService][modalIndex].src}
                  alt="gallery"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }} // Faster image transition
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Bigger vertical text area with curved corners */}
              <div className="p-6 bg-gradient-to-b from-black/10 to-transparent rounded-b-2xl min-h-[180px] md:min-h-[220px] flex items-center">
                <motion.p
                  key={galleries[activeService][modalIndex].caption}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }} // Faster text transition
                  className="text-gray-200 text-sm md:text-base text-center w-full"
                >
                  {galleries[activeService][modalIndex].caption}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WhoWeAre;