import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative bg-blue-600 text-white overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-20 bg-pattern bg-center" />
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
      }}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Discover the Best Products for Your Lifestyle
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Shop the latest trends with free shipping on orders over $99. Satisfaction guaranteed
          with our 30-day return policy.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/allproducts"
            className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/allproducts"
            className="bg-transparent border-2 border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
