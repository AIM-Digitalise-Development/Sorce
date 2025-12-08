import React from "react";
import { FaStar } from "react-icons/fa";
import ReviewSlider from "./ReviewSlider";

const Client = () => {
  return (
    <div className="pt-20 pb-20 flex items-center justify-center flex-col bg-white">
      <div className="w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            What our customers are saying us?
          </h1>

          <p className="mt-6 text-gray-800">
          Crafting journeys, exceeding expectations: Your travel dreams, our dedicated expertise
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <div>
              <p className="text-2xl font-bold text-gray-800 ">4.88</p>
              <p className="text-white mb-2">Overall Rating</p>
              <div className="flex items-center">
                <FaStar className="text-white" />
                <FaStar className="text-white" />
                <FaStar className="text-white" />
                <FaStar className="text-white" />
                <FaStar className="text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <ReviewSlider/>
        </div>
      </div>
    </div>
  );
};

export default Client;
