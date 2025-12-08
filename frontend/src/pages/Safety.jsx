import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Safety = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-[60vh]">
        <img
          src="/assets/service5.jpg"
          alt="Safety Banner"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl font-bold bg-black/60"
        >
          Safety & Quality
        </motion.div>
      </div>

      {/* Quality Work Process Section */}
      <div className="container mx-auto my-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              Quality Work Process
            </h2>
            <p className="text-lg text-gray-700">
              We adhere to a structured Quality Management System (QMS) designed
              to meet and exceed the requirements of ISO 9001:2008.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Procedure manuals & quality plans.</li>
              <li>Work methods and operational policies.</li>
              <li>Annual corporate and individual goals.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img
              src="/assets/gallery5.jfif"
              alt="Quality Work Process"
              className="rounded-lg shadow-lg w-full h-auto max-w-md"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Safety Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <img
                src="/assets/safety.jfif"
                alt="Safety Measures"
                className="rounded-lg shadow-lg w-full h-auto max-w-md"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                Safety
              </h2>
              <p className="text-lg text-gray-700">
                Safety is our top priority. We maintain a safe working
                environment for our team and clients.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Robust Safety Management System.</li>
                <li>Corporate safety culture.</li>
                <li>Industry-leading safety performance.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Safety Matters Section */}
      <div className="container mx-auto my-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-8"
        >
          Why Safety Matters
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🛡️", title: "Protection", desc: "Safety of our team and clients is our priority." },
            { icon: "📜", title: "Compliance", desc: "We follow all safety regulations." },
            { icon: "🏆", title: "Excellence", desc: "A safe workplace boosts productivity." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 bg-gray-100 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Safety;
