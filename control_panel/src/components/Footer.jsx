import 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/logo.jpeg" alt="Company Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-300">
            AIM Digitalise is a premier digital solutions provider specializing in
            cutting-edge design and technology services to elevate your brand.
          </p>
        </div>
        
        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Exterior Cladding</li>
            <li>Structural Glazing</li>
            <li>Interior Design</li>
            <li>MEP/HVAC Systems</li>
          </ul>
        </div>
        
        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: support@aimdigitalise.com</li>
            <li>Phone: +91 9876543210</li>
            <li><a href="/login" className="text-white hover:underline">Login</a></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-400"><FaFacebookF size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaTwitter size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaLinkedinIn size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaInstagram size={20} /></a>
          </div>
        </div>
        
        {/* Map & Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Location</h3>
          <div className="w-full h-40 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7368.215504842428!2d88.35365879161783!3d22.575072917959655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277ad7551b09b%3A0x4eb82dde38e4ac71!2sKolkata%2C%20West%20Bengal%20700073!5e0!3m2!1sen!2sin!4v1739962091848!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="mt-2 text-gray-300">Kolkata, West Bengal 700073</p>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-600 pt-4 text-gray-300 text-sm">
        Copyright &copy; 2025. All Rights Reserved by AIM Digitalise.
      </div>
    </footer>
  );
};

export default Footer;
