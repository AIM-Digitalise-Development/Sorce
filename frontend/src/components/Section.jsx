import React from "react";

const ChooseYourPlaceSection = () => {
  return (
    <div className="relative bg-gray-900 py-16 px-8 lg:px-32 text-center">
      {/* Background Pattern or Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-10"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Building Better Healthcare
        </h2>

        {/* Description */}
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          Establishing a hospital is more than just construction—it’s about creating a hub for life-saving care.  
          We provide end-to-end solutions: securing all essential licenses, designing modern facilities, supplying premium medical equipment from radiology to critical care, and providing trained manpower for seamless operations.  
          On top of that, we handle annual maintenance so your hospital always runs efficiently. Trust us to transform your vision into a thriving healthcare institution in Kolkata.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-all transform hover:scale-105">
            CONTACT US
          </button>
          <button className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-full shadow-lg border-2 border-blue-900 hover:bg-gray-50 transition-all transform hover:scale-105">
            MAKE AN ENQUIRY
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourPlaceSection;
