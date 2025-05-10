import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";
import React from "react";
import logoicon from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-gray-700 w-full">
      <hr className="border-blue-400" />
      <div className="w-full px-4 sm:px-6 lg:px-24 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logoicon} className="mb-5 w-32" alt="WorldWise Logo" />
            </Link>
            <p className="mb-6 text-sm text-gray-600">
              Explore the world one country at a time. Discover facts, cultures,
              languages, and more with <strong>WorldWise</strong>.
            </p>
            <div className="flex space-x-4 text-blue-600">
              <a href="#" className="hover:text-blue-800 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-800 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-800 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-800 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-blue-700">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/countries"
                  className="hover:text-blue-800 transition-colors"
                >
                  Explore Countries
                </Link>
              </li>
              <li>
                <Link
                  to="/regions"
                  className="hover:text-blue-800 transition-colors"
                >
                  Regional Highlights
                </Link>
              </li>
              <li>
                <Link
                  to="/currency"
                  className="hover:text-blue-800 transition-colors"
                >
                  Currency Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/languages"
                  className="hover:text-blue-800 transition-colors"
                >
                  Languages Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-800 transition-colors"
                >
                  About WorldWise
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-blue-700">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-800 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-blue-800 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-800 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-800 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/newsletter"
                  className="hover:text-blue-800 transition-colors"
                >
                  Newsletter Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-blue-700">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start text-gray-600">
                <MapPin size={20} className="mr-3 mt-0.5 text-blue-500" />
                123 Global Lane, World City, Earth 10100
              </li>
              <li className="flex items-center text-gray-600">
                <Phone size={20} className="mr-3 text-blue-500" />
                +1 (800) 123-4567
              </li>
              <li className="flex items-center text-gray-600">
                <Mail size={20} className="mr-3 text-blue-500" />
                hello@worldwise.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WorldWise. All rights reserved.
          </p>
          <div className="flex space-x-6 text-blue-600">
            <FaCcVisa size={32} className="hover:text-blue-800 transition" />
            <FaCcMastercard
              size={32}
              className="hover:text-blue-800 transition"
            />
            <FaCcPaypal size={32} className="hover:text-blue-800 transition" />
            <FaApplePay
              size={32}
              className="hover:text-blue-800 transition"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
