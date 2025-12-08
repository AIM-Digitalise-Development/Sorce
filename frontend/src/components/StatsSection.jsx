import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileContract, FaHospitalAlt, FaXRay, FaUserMd, FaTools } from "react-icons/fa";

const StatsSection = () => {
  const navigate = useNavigate();
  const stats = [
    { number: 50, label: "Licenses Managed", icon: <FaFileContract size={30} /> },
    { number: 10, label: "Hospitals Planned", icon: <FaHospitalAlt size={30} /> },
    { number: 200, label: "Medical Equipments Supplied", icon: <FaXRay size={30} /> },
    { number: 150, label: "Trained Staff Provided", icon: <FaUserMd size={30} /> },
    { number: 100, label: "Annual Maintenances Done", icon: <FaTools size={30} /> },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((count, index) =>
          count < stats[index].number ? count + Math.ceil(stats[index].number / 100) : count
        )
      );
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 py-20 px-6 lg:px-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Empowering Hospitals with Quality & Care
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          From licenses to equipment and skilled manpower, we ensure your hospital runs smoothly and efficiently.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Get In Touch
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
          >
            <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 text-white text-3xl shadow-md">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900">{counts[index]}+</div>
            <div className="text-center mt-2 text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
