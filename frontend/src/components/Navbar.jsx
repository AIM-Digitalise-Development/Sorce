import React from 'react';

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Import dropdown icon
// import logo from "../assets/logo.jpeg"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(""); // To track active dropdown item

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCompanyDropdown = () => {
    setIsCompanyOpen(!isCompanyOpen);
    setIsServicesOpen(false); // Close Services if open
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
    setIsCompanyOpen(false); // Close Company if open
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsCompanyOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <nav className="bg-white text-gray-900 py-4 px-6 relative z-50">
      <div className="flex justify-between items-center">
        {/* Left side: Logo */}
        <NavLink to="/">
        <img src="/assets/logo.jpeg" alt="Company Logo" className="h-12 w-18 cursor-pointer" />

  </NavLink>


        {/* Middle: Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-red-600 ${
                isActive ? "text-red-600 font-bold" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-red-600 ${
                isActive ? "text-red-600 font-bold" : ""
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `hover:text-red-600 ${
                isActive ? "text-red-600 font-bold" : ""
              }`
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `hover:text-red-600 ${
                isActive ? "text-red-600 font-bold" : ""
              }`
            }
          >
          Products
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-red-600 ${
                isActive ? "text-red-600 font-bold" : ""
              }`
            }
          >
            Contact
          </NavLink>
            <NavLink
  to="/review"
  className={({ isActive }) =>
    `block px-4 py-2 ${
      isActive ? "text-red-600 font-bold" : "hover:text-red-600"
    }`
  }
  onClick={toggleMenu}
>
  Reviews
</NavLink>

          
        </div>

        {/* Let's Talk Button */}
        <div className="hidden md:flex items-center space-x-2">
  <NavLink to="/contact">
    <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300">
      <span className="mr-2">book now</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </NavLink>
</div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

       {/* Mobile Menu */}
       {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-red-600 font-bold" : "hover:text-red-600"
              }`
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-red-600 font-bold" : "hover:text-red-600"
              }`
            }
            onClick={toggleMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-red-600 font-bold" : "hover:text-red-600"
              }`
            }
            onClick={toggleMenu}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-red-600 font-bold" : "hover:text-red-600"
              }`
            }
            onClick={toggleMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block px-4 py-2 ${
                isActive ? "text-red-600 font-bold" : "hover:text-red-600"
              }`
            }
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
          <NavLink
  to="/review"
  className={({ isActive }) =>
    `block px-4 py-2 ${
      isActive ? "text-red-600 font-bold" : "hover:text-red-600"
    }`
  }
  onClick={toggleMenu}
>
  Reviews
</NavLink>

          {/* Let's Talk Button */}
          <NavLink to="/contact" className="block">
            <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full w-full justify-center mt-2">
              <span className="mr-2">book now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;