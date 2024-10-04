import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer style={{backgroundColor:'#d3d5e3'}} className="text-slate-700 py-12 relative">
      <div className="container mx-auto px-4">
        {/* Task Letter / Subscribe Section */}
        <div className="bg-slate-200 p-6 rounded-md shadow-xl max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Subscribe to our Newsletter</h2>
          <div className="flex items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full max-w-lg border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links and Social Media Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Navigation Links */}
          <div className="flex space-x-6 ml-10">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">About Us</a>
            <a href="#" className="hover:text-blue-600">Services</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mr-10">
            <a href="#" className="text-slate-700 hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Horizontal Rule */}
        <hr className="border-t border-gray-400 mb-6" />

        {/* Final Section: Copyright, Logo, and Terms */}
        <div className="flex justify-between items-center">
          {/* Copyright Text */}
          <p className="text-sm text-gray-500 ml-10">
            © 2024 VoyaGo. All rights reserved.
          </p>

          {/* Logo */}
          <div className="text-center">
            <img className='w-14' src="/VOYAGO.png" alt="" />
          </div>

          {/* Privacy Policy and Terms */}
          <div className="flex space-x-4 mr-10">
            <a href="#" className="text-sm hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-blue-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
