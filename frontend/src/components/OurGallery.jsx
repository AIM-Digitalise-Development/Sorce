import Slider from "react-slick";
import React from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const OurGallery = () => {
  const galleryImages = [
    "/assets/gallery18.jpg",
    "/assets/gallery26.jpg",
    "/assets/gallery15.jpg",
    "/assets/gallery20.jpg",
    "/assets/gallery11.jpg",
    "/assets/gallery13.jpg",
    "/assets/gallery8.jpg",
    "/assets/gallery3.jpg",
  
  ];

  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 left-0 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-900 transition-all"
      onClick={onClick}
    >
      <FaArrowLeft size={20} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 right-0 z-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-900 transition-all"
      onClick={onClick}
    >
      <FaArrowRight size={20} />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto py-16 px-8 lg:px-16 text-center text-black">
      <h2 className="text-4xl font-bold mb-6">Our Gallery</h2>

      {/* Carousel */}
      <div className="mt-12 w-full">
        <Slider {...sliderSettings} key={galleryImages.length}>
          {galleryImages.map((image, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurGallery;
