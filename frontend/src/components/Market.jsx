import React from "react";

const nearestMarkets = [
  { name: "Bazar Kolkata Hatibagan", image: "/assets/market1.jpg" },
  { name: "FBB Hatibagan", image: "/assets/market2.jpg" },
  { name: "Pantaloons Hatibagan", image: "/assets/market3.jpg" },
  { name: "Citi Mart", image: "/assets/market4.jpg" },
  { name: "Bata", image: "/assets/market5.jpg" },
  { name: "Hatibagan Market", image: "/assets/market6.jpg" },
];

const MarketSection = () => {
  return (
    <div className="bg-gray-900 py-20 px-8 lg:px-16 text-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white mb-4">Nearest Market</h2>
      <p className="text-lg text-white mb-12">ANY TIME, ANYWHERE – YOU CAN GO WHEREVER YOU WANT.</p>

      {/* Market Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {nearestMarkets.map((market) => (
          <div key={market.name} className="relative group">
            <img
              src={market.image}
              alt={market.name}
              className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white text-lg font-semibold">{market.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSection;
