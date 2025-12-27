import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Hospital Services Data
const services = [
  {
    title: "LICENSE MANAGEMENT",
    images: ["/assets/gallery11.jpg", "/assets/gallery12.jpg", "/assets/gallery13.jpg"],
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
    title: "HOSPITAL PLANNING & FACILITY ",
    images: ["/assets/gallery14.jpg", "/assets/gallery11.jpg", "/assets/gallery12.jpg"],
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
    title: "MEDICAL EQUIPMENTS & SERVICES",
    images: ["/assets/gallery13.jpg", "/assets/gallery14.jpg", "/assets/gallery11.jpg"],
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
  {
    title: "ANNUAL MAINTENANCE",
    images: ["/assets/gallery12.jpg", "/assets/gallery13.jpg", "/assets/gallery14.jpg"],
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
  const [selectedService, setSelectedService] = useState(null); // for modal
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Auto-play modal carousel every 1.2s when modal open
  useEffect(() => {
    if (!selectedService) return;
    const interval = setInterval(() => {
      setModalImageIndex((i) => {
        const len = selectedService.images?.length || 1;
        return (i + 1) % len;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [selectedService]);

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
          className="absolute inset-0 flex items-center justify-center bg-black/60 text-center px-4"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Welcome to Our Hospital Solutions!
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/90">
              We specialize in building, equipping, and supporting hospitals with everything required for modern medical care — from licenses and infrastructure to manpower and medical equipment. Our goal is to enable hospitals to deliver the highest standard of care.
            </p>
          </div>
        </motion.div>
      </div>
      

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-red-500">About Our Medical Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const fullText = (service.details || []).join(" ");
              const preview = fullText.length > 140 ? fullText.slice(0, 140).trim() + "..." : fullText;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-lg shadow-md cursor-pointer hover:shadow-2xl transition overflow-hidden min-h-[200px] flex flex-col justify-end"
                  onClick={() => {
                    setSelectedService(service);
                    setModalImageIndex(0);
                  }}
                  style={{
                    backgroundImage: `url(${service.images?.[0] || '/assets/gallery11.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-white uppercase leading-tight">{service.title}</h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">{preview}</p>
                    <p className="mt-2 italic text-white/80 text-sm">"{service.quote}"</p>
                    <div className="mt-3">
                      <span className="inline-block bg-white/20 text-white px-3 py-1 rounded cursor-pointer">Click me to know more</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md z-50 hover:bg-white"
            >
              &times;
            </button>
            <div className="p-6 overflow-y-auto flex-1">

              {/* Sticky Carousel at top of modal */}
              <div className="sticky top-0 bg-white z-20 w-full h-48 mb-4 rounded-md overflow-hidden">
                <img
                  src={selectedService.images?.[modalImageIndex] || "/assets/gallery11.jpg"}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>

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

      {/* Removed Image Carousel Section */}
      
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