import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-12 px-6 md:px-16">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/assets/logo.png" alt="Company Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-300 text-justify">
            Why Choose Us<br /><br />
            Based in Kolkata, we provide comprehensive hospital solutions — from securing licenses to supplying top-quality medical equipment and trained staff. Our nurses, ayas, and healthcare assistants are skilled, reliable, and maintain the highest hygiene standards. <br /><br />
            We also handle annual maintenance, compliance, and operational support so your facility runs smoothly. With our local expertise and professional services, your hospital or healthcare facility is in trusted hands.
          </p>
        </div>
        
        {/* Links */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>About us</li>
            <li>Gallery</li>
            <li>Contact Us</li>
          </ul>
        </div> */}
        
        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: sourcehealthcaresolutions@gmail.com</li>
            <li>Phone:+917980071495</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-400"><FaFacebookF size={20} /></a>
            {/* <a href="#" className="text-white hover:text-gray-400"><FaTwitter size={20} /></a> */}
            {/* <a href="#" className="text-white hover:text-gray-400"><FaLinkedinIn size={20} /></a> */}
            <a href="#" className="text-white hover:text-gray-400"><FaInstagram size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><FaYoutube size={20} /></a>
          </div>
        </div>
        
        {/* Map & Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Location</h3>
          <div className="w-full h-40 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.6127646331456!2d88.37177707507837!3d22.593581979476767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277ef4b37776f%3A0x323d217b002e18cd!2sStore!5e0!3m2!1sen!2sin!4v1740393757735!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="mt-2 text-gray-300">
            15/1, Nrisingha Dutta Rd, Barisha, Kolkata, West Bengal 700008, India
            Land Mark- Near Shaker Bazar
          </p>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-600 pt-4 text-gray-300 text-sm">
        Copyright &copy; 2025. All Rights Reserved by{" "}
        <a
          href="https://aimdigitalise.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 underline"
        >
          AIM Digitalise
        </a>.
      </div>

    </footer>
  );
};

export default Footer;
