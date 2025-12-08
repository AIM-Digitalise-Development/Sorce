import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Footer from "../components/Footer";

// Carousel Images
const carouselImages = [
  "/assets/gallery11.jpg",
  "/assets/gallery12.jpg",
  "/assets/gallery13.jpg",
  "/assets/gallery14.jpg",
];

// Hospital Services Data
const services = [
  {
    title: "LICENSE MANAGEMENT",
    details: [
      "Obtain Clinical Establishment License",
      "Fire NOC and Pollution Certificate",
      "Biomedical Waste Management Certificate",
      "PCPNDT & other regulatory compliances",
      "We ensure your hospital meets all legal and safety requirements"
    ],
    quote: "Compliance is the foundation of safe healthcare."
  },
  {
    title: "HOSPITAL PLANNING ,FACILITY WITH MANPOWER SERVICES",
    details: [
      "Complete hospital planning and layout design",
      "Construction and setup of all facility zones",
      "Integration of patient-friendly infrastructure",
      "Optimized space for operations, wards, and ICUs",
      "Designing hospitals that balance function with comfort",
      "Permanent or contractual staffing support",
      "Trained nurses, technicians, and support staff",
      "Efficient administrative & facility management",
      "We provide staffing solutions that meet hospital needs",
      "Reliable teams to keep your hospital running smoothly"
    ],
    quote: "Building hospitals that care before patients arrive."
  },
  {
    title: "MEDICAL EQUIPMENTS",
    details: [
      "Radiology: X-Ray (CR & DR), Ultrasound, CT & MRI support",
      "OPD (Outpatient Department): Examination tables & couches, Stethoscopes, BP apparatus, thermometers, Weighing scales, height measuring stand, Diagnostic sets (otoscope, ophthalmoscope), Basic dressing instruments, Patient chairs & doctor stools, Computers & registration desks.",
    
    "Pathology / Laboratory: Centrifuge machine, Microscope (light & binocular), Blood analyzers (hematology, biochemistry), Pipettes, beakers, test tubes, Incubator, hot air oven, Refrigerator for samples, PPE kits, gloves, disinfectants.",
    
    "Blood Bank: Blood storage refrigerator, Deep freezer (-40°C), Blood collection mixers, Plasma extractor, Blood bag sealer, Centrifuge (refrigerated), Hematology analyzer, Cross-matching workstation.",
    
    "Radiology: X-ray machine (digital preferred), Ultrasound machine, CT scan or MRI (as applicable), Lead aprons & protective barriers, Film processor / PACS system, Radiographic table.",
    
    "Cardiology: ECG machine, Treadmill test (TMT) system, Echocardiography machine, Cardiac monitors, Defibrillator, Holter monitoring system.",
    
    "IPD (Inpatient Department): Hospital beds & mattresses, Bedside lockers, Overbed tables, IV stands, Wheelchairs, stretchers, Nurse call system.",
    
    "Ward: General ward beds & furniture, Bedpans, urinals, Sanitary bins, Oxygen supply points, Pulse oximeters, BP apparatus, Curtains / partitions."
    ],
    quote: "Equipping hospitals for precision and efficiency."
  },
  // {
  //   title: "MANPOWER SERVICES",
  //   details: [
  //     "Permanent or contractual staffing support",
  //     "Trained nurses, technicians, and support staff",
  //     "Efficient administrative & facility management",
  //     "We provide staffing solutions that meet hospital needs",
  //     "Reliable teams to keep your hospital running smoothly"
  //   ],
  //   quote: "Dedicated professionals for exceptional patient care."
  // },
  {
    title: "ANNUAL MAINTENANCE",
    details: [
      "Regular maintenance of hospital machinery",
      "Renewal and management of necessary licenses",
      "Equipment calibration and servicing",
      "Full compliance and operational safety checks",
      "Peace of mind through meticulous maintenance planning"
    ],
    quote: "Keeping your hospital compliant, functional, and safe."
  }
];

const AboutUsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [selectedService, setSelectedService] = useState(null); // for modal

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex >= carouselImages.length - 2 ? 0 : prevIndex + 2
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 2 : prevIndex - 2
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Banner */}
      <div className="relative w-full h-[60vh]">
        <img
          src="/assets/gallery10.jpg"
          alt="About Us Banner"
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold bg-black/60 text-center px-4"
        >
          About Our Medical Services
        </motion.div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto my-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to Our Hospital Solutions!
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          We specialize in building, equipping, and supporting hospitals with everything required for modern medical care — from licenses and infrastructure to manpower and medical equipment. Our goal is to enable hospitals to deliver the highest standard of care.
        </p>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-red-500">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-2xl transition"
                onClick={() => setSelectedService(service)}
              >
                <h3 className="text-2xl font-bold mb-4 text-red-500">{service.title}</h3>
                <p className="text-gray-700">
                  {service.details.slice(0, 2).join(", ")}...
                </p>
                <p className="mt-2 italic text-gray-500">"{service.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="p-6 overflow-y-auto flex-1">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedService.title}</h2>
              <p className="italic text-gray-500 mb-4">"{selectedService.quote}"</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {selectedService.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Carousel */}
      <div className="container mx-auto my-20 px-6 relative">
        <div className="relative w-full h-[400px] flex gap-4 overflow-hidden rounded-lg shadow-lg">
          {carouselImages.slice(currentImageIndex, currentImageIndex + 2).map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Hospital"
              className="w-1/2 h-full object-cover rounded-lg"
            />
          ))}
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition"
        >
          <FaArrowLeft className="text-gray-800 text-xl" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition"
        >
          <FaArrowRight className="text-gray-800 text-xl" />
        </button>
      </div>
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
      <Footer />
    </div>
  );
};

export default AboutUsPage;
