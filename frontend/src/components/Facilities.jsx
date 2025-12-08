import React from "react";
import {
  FaWifi, FaHotTub, FaSnowflake, FaUtensils, FaUserMd,
  FaTint, FaTv, FaFireExtinguisher
} from "react-icons/fa";
import {
  MdLocalLaundryService, MdKitchen, MdOutlineSecurity,
  MdOutlineBathroom, MdLocalDrink
} from "react-icons/md";
import { GiCctvCamera } from "react-icons/gi";

const facilities = [
  { icon: <MdOutlineSecurity />, label: "Safety & Security" },
  { icon: <FaWifi />, label: "Free Wi-Fi" },
  { icon: <FaSnowflake />, label: "A.C & Non-A.C Rooms" },
  { icon: <FaUtensils />, label: "Veg & Non-Veg Meals" },
  { icon: <FaUserMd />, label: "Doctor on Call" },
  { icon: <FaTint />, label: "24 Hours Water" },
  { icon: <FaHotTub />, label: "Geyser" },
  { icon: <MdLocalLaundryService />, label: "Washing Machine" },
  { icon: <MdKitchen />, label: "Fridge / Refrigerator" },
  { icon: <FaTv />, label: "LED TV" },
  { icon: <MdOutlineBathroom />, label: "Attached Bathroom" },
  { icon: <MdLocalDrink />, label: "Aquaguard" },
  { icon: <FaFireExtinguisher />, label: "Fire Extinguisher" },
  { icon: <GiCctvCamera />, label: "CCTV Cameras" },
];

const Facilities = () => {
  return (
    <div
      className="bg-cover bg-center py-8 px-4 lg:px-8 text-gray-900"
      style={{ backgroundImage: "url('assets/bg.jpg')" }}
    >
      <div className="container mx-auto max-w-4xl text-center bg-white bg-opacity-90 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Class Facilities</h2>
        <p className="text-sm text-gray-600 mb-8">
          Comfortable, secure, and well-equipped PG stay for students & working professionals.
        </p>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white shadow-sm rounded-md transform transition duration-200 hover:scale-105"
            >
              <div className="text-blue-600 text-2xl mb-2">{facility.icon}</div>
              <p className="text-sm font-medium text-gray-700 text-center">{facility.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
