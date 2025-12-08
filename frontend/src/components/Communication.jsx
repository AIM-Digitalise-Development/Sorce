import React, { useState } from "react";

const communicationAreas = [
  { name: "Sovabazar Metro", image: "/assets/comm1.jpg", distance: "1-2 km" },
  { name: "Shyambazar Metro", image: "/assets/comm2.jpg", distance: "1-2 km" },
  { name: "Sealdah", image: "/assets/comm3.jpg", distance: "4-5 km" },
  { name: "Sahitya Parishat Bus Stop", image: "/assets/comm4.jpg", distance: "0.1-0.2 km" },
  { name: "Rupbani Bus Stop", image: "/assets/comm5.jpg", distance: "0.5-1 km" },
  { name: "Kolkata Rail Station", image: "/assets/comm6.jpg", distance: "2-3 km" },
  { name: "Kolkata Airport", image: "/assets/comm7.jpg", distance: "10-12 km" },
  { name: "Ahiritola Ferry Ghat", image: "/assets/comm8.jpg", distance: "2-3 km" },
  { name: "Bidhannagar Station", image: "/assets/comm9.jpg", distance: "8-10 km" },
];

const CommunicationSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="bg-cover bg-center py-20 px-6 lg:px-16 text-center relative"
      style={{ backgroundImage: "url('/assets/bg-2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-90"></div> 
      
      <h2 className="text-4xl font-bold text-white relative z-10 mb-12">
        Nearby Communication Areas
      </h2>

      <div className="hidden sm:flex relative w-[600px] h-[600px] mx-auto">
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src="/assets/gallery1.jpg"
            alt="Our PG"
            className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition duration-300 relative z-10"
          />
        </div>

        {communicationAreas.map((place, index) => {
          const angle = (index / communicationAreas.length) * 2 * Math.PI;
          const radius = 270;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={place.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-white"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-24 h-24 rounded-full border-4 border-red-700 shadow-md object-cover transform hover:scale-110 transition duration-300 relative z-10"
                onMouseEnter={() => setHovered(place.name)}
                onMouseLeave={() => setHovered(null)}
              />
              <p className="text-sm font-semibold mt-2 relative z-10">
                {place.name}
              </p>
              {hovered === place.name && (
                <p className="text-xs bg-gray-800 text-white px-2 py-1 rounded absolute mt-2">
                  {place.distance}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="sm:hidden grid grid-cols-2 gap-6 relative z-10">
        {communicationAreas.map((place) => (
          <div key={place.name} className="flex flex-col items-center">
            <img
              src={place.image}
              alt={place.name}
              className="w-24 h-24 rounded-full border-4 border-red-700 shadow-md object-cover transform hover:scale-110 transition duration-300"
              onMouseEnter={() => setHovered(place.name)}
              onMouseLeave={() => setHovered(null)}
            />
            <p className="text-sm font-semibold mt-2">{place.name}</p>
            {hovered === place.name && (
              <p className="text-xs bg-gray-800 text-white px-2 py-1 rounded mt-1">
                {place.distance}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationSection;
