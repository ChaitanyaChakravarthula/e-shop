import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-20 text-white pt-10 pb-6">
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-b border-gray-800">
        <div className="flex items-center">
          <Truck size={28} className="text-blue-500 mr-4" />
          <div>
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-gray-400 text-sm">On all orders over $99</p>
          </div>
        </div>
        <div className="flex items-center">
          <CreditCard size={28} className="text-blue-500 mr-4" />
          <div>
            <h3 className="font-semibold">Secure Payments</h3>
            <p className="text-gray-400 text-sm">Protected by industry leaders</p>
          </div>
        </div>
        <div className="flex items-center">
          <Shield size={28} className="text-blue-500 mr-4" />
          <div>
            <h3 className="font-semibold">Money Back Guarantee</h3>
            <p className="text-gray-400 text-sm">30-day return policy</p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About ShopHub</h3>
          <p className="text-gray-400 mb-4">
            We offer a curated selection of high-quality products at competitive prices.
            Our mission is to provide exceptional shopping experiences.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {['/', '/allproducts', '/about', '/contact', '/faq'].map((link, idx) => (
              <li key={idx}>
                <Link to={link} className="text-gray-400 hover:text-white transition-colors">
                  {link === '/' ? 'Home' : link.slice(1).replace(/^\w/, c => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            {['orders', 'returns', 'shipping', 'privacy', 'terms'].map((route, idx) => (
              <li key={idx}>
                <Link to={`/${route}`} className="text-gray-400 hover:text-white transition-colors">
                  {route.replace(/^\w/, c => c.toUpperCase()).replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPin size={18} className="text-gray-400 mr-2 mt-1" />
              <span className="text-gray-400">123 Commerce St, Business City, ST 54321</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-400">(555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-400">support@shophub.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-6 border-t border-gray-800 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
