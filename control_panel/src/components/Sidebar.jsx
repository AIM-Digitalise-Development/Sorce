import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, FaImage, FaClipboardList, FaUserFriends, FaBriefcase, 
  FaUsers, FaLayerGroup, FaChartBar, FaThLarge, FaKey 
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen p-6 shadow-lg">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold mb-6 text-center border-b pb-3 border-gray-700">Admin Panel</h2>

      {/* Sidebar Menu */}
      <ul className="space-y-3">
        {[
          { path: "/", label: "Home", icon: <FaHome /> },
          { path: "/change-password", label: "Change Password", icon: <FaKey /> }, // ✅ Updated icon

          { path: "/banner", label: "Manage Banners", icon: <FaThLarge /> },
          { path: "/gallery", label: "Manage Gallery", icon: <FaImage /> },
          { path: "/activities", label: "Manage Products", icon: <FaLayerGroup /> },
          { path: "/reviews", label: "Manage Testimonials", icon: <FaUserFriends /> },
          { path: "/leads", label: "Manage Leads", icon: <FaChartBar /> },
          { path: "/career", label: "Manage Careers", icon: <FaBriefcase /> },
          { path: "/team", label: "Manage Team", icon: <FaUsers /> },
        ].map(({ path, label, icon }) => (
          <li key={path} className="text-lg">
            <NavLink
              to={path}
              className="flex items-center py-3 px-4 rounded-md hover:bg-gray-700 hover:text-gray-300 transition duration-300"
              activeClassName="bg-gray-700 text-gray-300"
            >
              <span className="mr-3 text-xl">{icon}</span> {/* Icon */}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
