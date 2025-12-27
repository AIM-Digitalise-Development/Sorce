import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import axios from "../utils/axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🆕 Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  // itemsPerPage: number (0 means show All)
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axios.get("/activities");
        setActivities(data);
        setFilteredActivities(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch activities", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Unique categories
  const categories = ["All", ...new Set(activities.map((a) => a.category).filter(Boolean))];

  // Filter & search logic
  useEffect(() => {
    let filtered = activities;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (a) => a.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
    setCurrentPage(1); // reset to page 1 on new filter/search
  }, [activities, searchTerm, selectedCategory]);

  // Reset to page 1 whenever itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // 🧮 Pagination Calculations
  const totalPages = itemsPerPage === 0 ? 1 : Math.max(1, Math.ceil(filteredActivities.length / itemsPerPage));
  const indexOfLast = itemsPerPage === 0 ? filteredActivities.length : currentPage * itemsPerPage;
  const indexOfFirst = itemsPerPage === 0 ? 0 : indexOfLast - itemsPerPage;
  const currentItems = itemsPerPage === 0 ? filteredActivities : filteredActivities.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 300, behavior: "smooth" }); // smooth scroll to top of grid
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Banner - Reduced height from h-[80vh] to h-[50vh] */}
      <div className="relative w-full">
        <img
          src="/assets/med.jpg"
          alt="Products"
          className="w-full h-[50vh] object-cover" // Changed from h-[80vh]
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold leading-tight" // Slightly reduced text sizes
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium Hospital Equipment & Solutions
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl mt-4 font-medium max-w-2xl mx-auto" // Reduced text sizes and margin
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From radiology to critical care — explore high-quality medical
            products that power modern hospitals.
          </motion.p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-6 md:px-12 py-8 bg-white flex flex-col md:flex-row items-center justify-between gap-4"> {/* Reduced padding */}
        <input
          type="text"
          placeholder="🔍 Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        
        {/* page-size is moved into pagination footer for a simpler layout */}
      </div>

      {/* Products */}
      <div className="px-10 py-12 bg-gray-50"> {/* Reduced padding */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6"> {/* Reduced text size and margin */}
          Our Products
        </h2>

        {currentItems.length === 0 ? (
          <p className="text-center text-gray-500">
            No products match your search or category.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Reduced gap */}
              {currentItems.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  className="bg-white shadow-md hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-56 object-cover" // Slightly reduced image height
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-5"> {/* Reduced padding */}
                    <h3 className="text-xl font-semibold text-gray-800"> {/* Reduced text size */}
                      {activity.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Category: {activity.category || "N/A"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination footer: left = Prev / pages / Next, right = page-size select */}
            <div className="mt-8 flex items-center justify-between"> {/* Reduced margin */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Prev
                </button>

                <div className="inline-flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-2 leading-tight border border-gray-300 rounded-md ${
                        currentPage === i + 1
                          ? "bg-blue-100 text-blue-700"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Next
                </button>
              </div>

              <div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="w-36 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value={12}>12 / page</option>
                  <option value={24}>24 / page</option>
                  <option value={0}>All</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal - FIXED close button visibility */}
      {selectedActivity && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Close Button - Now clearly visible */}
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-3 right-3 z-50 bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 p-2 rounded-full shadow-lg border border-gray-200 flex items-center justify-center w-10 h-10"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex-shrink-0 relative">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <h2 className="text-2xl font-bold mb-2">{selectedActivity.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                Category: {selectedActivity.category || "N/A"}
              </p>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedActivity.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919875680537?text=Thank%20you%20for%20connecting%20with%20us.%20We%20will%20shortly%20reach%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
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

export default Activities;