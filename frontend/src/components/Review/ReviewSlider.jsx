import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import axios from "../../utils/axios";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/reviews");
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[350px] text-white">
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[350px] text-red-500">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-[350px] text-gray-400">
        No reviews available
      </div>
    );
  }

  return (
    <div className="relative py-16 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* background blur circles */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-30 rounded-full blur-3xl top-10 left-10 pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-600 opacity-30 rounded-full blur-3xl bottom-10 right-10 pointer-events-none"></div>

      <h2 className="text-4xl font-bold text-center text-white mb-4 tracking-wide drop-shadow-lg">
        What Our Clients Say
      </h2>

      {/* ✅ Added total review count */}
      <p className="text-gray-300 text-center mb-10 text-lg font-medium">
        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
      </p>

      {/* WRAPPER TO PREVENT OVERFLOW */}
      <div className="overflow-hidden w-full flex justify-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={40}
          slidesPerView={1}
          className="md:w-[700px] w-[90%] select-none"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div
                onClick={() => setSelectedReview(review)}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                
                <p className="text-gray-200 italic text-base leading-relaxed mb-4">
                  “{review.review}”
                </p>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`md:w-5 md:h-5 w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {review.name}
                </h3>
                <p className="text-gray-400 text-sm">{review.designation}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* MODAL */}
      {selectedReview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm overflow-hidden"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-gray-900 rounded-3xl overflow-hidden w-[90%] max-w-3xl relative shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-300 hover:text-white text-3xl font-bold z-10"
              onClick={() => setSelectedReview(null)}
            >
              &times;
            </button>

            <img
              src={selectedReview.imageUrl}
              alt={selectedReview.name}
              className="w-full h-auto max-h-[300px] object-contain bg-gray-100"
            />

            <div className="p-8 text-center">
              <img
                src={selectedReview.imageUrl}
                alt={selectedReview.name}
                className="w-[120px] h-[120px] rounded-full object-cover border-4 border-yellow-500 mx-auto -mt-16 shadow-lg"
              />
              <h2 className="text-2xl font-bold text-white mt-4">
                {selectedReview.name}
              </h2>
              <p className="text-gray-400">{selectedReview.designation}</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`md:w-6 md:h-6 w-5 h-5 ${
                      i < selectedReview.rating
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-300 mt-6 text-lg leading-relaxed px-2 sm:px-10">
                “{selectedReview.review}”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919875680537?text=Thank%20you%20for%20connecting%20with%20us!%20We%20will%20reach%20you%20shortly."
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
    </div>
  );
};

export default ReviewSlider;
