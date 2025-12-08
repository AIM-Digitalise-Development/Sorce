import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "../utils/axios";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get("/testimonials");
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-20 px-8 lg:px-16 text-center">
        <p>Loading testimonials...</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <div className="bg-gray-50 py-20 px-8 lg:px-16 text-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
      <p className="text-lg text-gray-700 mb-12">Real experiences from our happy residents</p>

      {/* Testimonials Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        className="max-w-5xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-lg rounded-xl p-6 text-left flex flex-col items-center">
              <FaQuoteLeft className="text-gray-400 text-3xl mb-4" />
              <p className="text-gray-800 text-lg mb-4 text-center">&quot;{testimonial.text}&quot;</p>

              {/* User Info */}
              <div className="flex items-center space-x-3 mt-4">
                <FaUserCircle className="text-gray-500 text-4xl" />
                <div>
                  <h3 className="text-gray-900 font-semibold">{testimonial.name}</h3>
                  <div className="flex text-yellow-500 mt-1">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;