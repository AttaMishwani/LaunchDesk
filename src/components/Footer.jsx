import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-bgc text-white mt-5 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-[#F8FAFC]">LaunchDesk</h2>
            <p className="text-gray-200 mt-2">
              Empowering freelancers with the best tools and opportunities.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#F8FAFC]">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E11D48]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E11D48]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E11D48]">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E11D48]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#F8FAFC]">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a
                href="#"
                className="text-gray-300 hover:text-[#E11D48] text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#E11D48] text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#E11D48] text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#E11D48] text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-[#6366F1] mt-6 pt-4 text-center text-gray-300">
          &copy; {new Date().getFullYear()} LaunchDesk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
