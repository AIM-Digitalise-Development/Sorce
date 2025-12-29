import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import Section from "../components/Section";
import Footer from "../components/Footer";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("projects");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/gallery?category=${selectedCategory}`);
        setImages(data);
        setCurrentPage(1); // Reset to first page when category changes
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch gallery items", error);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [selectedCategory]);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = images.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="relative w-full">
        <img
          src="/assets/gallery10.jpg"
          alt="Banner"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
            Our Gallery
          </h1>
        </motion.div>
      </div>

      {/* Gallery Heading */}
      <div className="text-center my-6 px-4">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Explore Our Recent Work
        </p>
        
        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-6">
          {['events', 'happy customers'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded capitalize ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      {images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found in this category</p>
        </div>
      ) : (
        <>
          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {currentImages.map((img) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 mb-12 space-x-2 sm:space-x-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Page Info */}
          {images.length > 0 && (
            <div className="text-center text-gray-600 mb-8">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, images.length)} of {images.length} images
            </div>
          )}
        </>
      )}

      {/* Section */}
      <div className="mt-8">
        <Section />
      </div>
      
      {/* WhatsApp Button */}
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;