import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Banner = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get("/banner");
        setBanner(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch banner", error);
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) {
    return <div className="h-[70vh] bg-gray-200 flex items-center justify-center">Loading banner...</div>;
  }

  if (!banner) {
    return <div className="h-[70vh] bg-gray-200 flex items-center justify-center">No banner available</div>;
  }

  return (
    <div className="relative">
      <div className="relative">
        {banner.mediaType === 'video' ? (
          <video
            src={banner.mediaUrl}
            autoPlay
            loop
            muted
            preload="auto"
            className="w-full h-[70vh] object-cover"
          />
        ) : (
          <img
            src={banner.mediaUrl}
            alt="Banner"
            className="w-full h-[70vh] object-cover"
          />
        )}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-yellow-400"
          >
            {banner.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
className="text-lg sm:text-xl mt-3 text-yellow-400"
            >
            {banner.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6"
          >
            <ul className="flex flex-wrap justify-center gap-2">
              {banner.services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                  className="text-sm sm:text-base bg-black bg-opacity-50 px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer hover:bg-opacity-80 transition"
                  onClick={() => navigate(service.path)}
                >
                  {service.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
