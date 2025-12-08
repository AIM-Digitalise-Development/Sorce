import React from "react";
import { FaClipboardCheck, FaHospital, FaCogs, FaUsers, FaTools, FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Hospitals Served", value: 12, icon: <FaHospital className="text-4xl" />, bg: "bg-blue-600" },
    { label: "Active Staff", value: 85, icon: <FaUsers className="text-4xl" />, bg: "bg-green-600" },
    { label: "Equipment Managed", value: 240, icon: <FaStethoscope className="text-4xl" />, bg: "bg-yellow-500" },
    { label: "Licenses & Compliance", value: 15, icon: <FaClipboardCheck className="text-4xl" />, bg: "bg-red-500" },
  ];

  const quickActions = [
    { label: "Manage Hospitals", bg: "bg-blue-500", icon: <FaHospital className="mr-2" /> },
    { label: "Manage Staff", bg: "bg-green-500", icon: <FaUsers className="mr-2" /> },
    { label: "Equipment Management", bg: "bg-yellow-500", icon: <FaTools className="mr-2" /> },
    { label: "Licenses & Compliance", bg: "bg-red-500", icon: <FaClipboardCheck className="mr-2" /> },
    { label: "View Reports", bg: "bg-indigo-500", icon: <FaCogs className="mr-2" /> },
    { label: "Patient Care Logs", bg: "bg-purple-500", icon: <FaStethoscope className="mr-2" /> },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Medical Services Admin Dashboard 🏥</h1>
        <p className="mt-2 text-gray-600">
          Monitor hospitals, staff, equipment, and compliance from a single centralized platform.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} text-white rounded-lg p-6 flex items-center justify-between shadow-lg hover:scale-105 transform transition`}
          >
            <div>{stat.icon}</div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate("/")} // replace with actual route if available
              className={`${action.bg} flex items-center justify-center text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition`}
            >
              {action.icon} {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
