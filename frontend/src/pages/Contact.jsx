import { useState } from "react";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "../utils/axios"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/enquiry", formData);
      setSubmitMessage("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      setSubmitMessage("Submission failed. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Hospital Licenses & Compliance",
    "Hospital Planning & Facility Setup",
    "Medical Equipment Supply",
    "Manpower Services for Hospitals",
    "Annual Maintenance & Support"
  ];

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-200 py-16 px-4 sm:px-10 lg:px-32 text-white">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch with Medical Services
        </motion.h1>
        <p className="text-center max-w-2xl mx-auto text-lg sm:text-xl">
          Whether you need hospital planning, medical equipment, trained staff, or license management, we provide complete solutions for hospitals and healthcare facilities in Kolkata.
        </p>
      </div>

      {/* Contact Form & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {submitMessage && (
            <div className={`mb-4 p-3 rounded ${submitMessage.includes("Thank") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {submitMessage}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="">Select Service</option>
              {services.map((service, i) => (
                <option key={i} value={service}>{service}</option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows="4"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-300 text-white font-semibold p-3 rounded-lg 
hover:from-yellow-300 hover:via-amber-500 hover:to-yellow-600 transition
"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaPhoneAlt className="text-red-600 text-3xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <a href="tel:7980071495" className="text-gray-600 hover:text-pink-600">7980071495</a>
            </div>
          </div>

          <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaEnvelope className="text-red-600 text-3xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <a href="mailto:sourcehealthcaresolutions@gmail.com" className="text-gray-600 hover:text-pink-600">sourcehealthcaresolutions@gmail.com</a>
            </div>
          </div>

          <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <FaMapMarkerAlt className="text-red-600 text-3xl mr-4" />
            <div>
              <h3 className="font-semibold text-gray-800">Location</h3>
              <p className="text-gray-600">15/1,NRISINGHA DUTTA ROAD, BARISHA, KOLKATA -700008</p>
            </div>
          </div>
        </div>
      </div>

      {/* <Section /> */}
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
      <Footer />
    </div>
  );
};

export default Contact;
