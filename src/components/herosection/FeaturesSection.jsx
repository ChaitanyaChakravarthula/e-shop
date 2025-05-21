import React from 'react';
import { TrendingUp, Clock, ShoppingBag, Zap } from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Top Quality', desc: 'We source only the highest quality products.' },
  { icon: Clock, title: 'Fast Delivery', desc: 'Quick shipping to get products to you fast.' },
  { icon: ShoppingBag, title: 'Easy Returns', desc: 'Hassle-free returns for peace of mind.' },
  { icon: Zap, title: 'Secure Checkout', desc: 'Encrypted payment for secure transactions.' }
];

const FeaturesSection = () => (
  <section className="py-12 px-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        We're dedicated to providing the best shopping experience with quality products.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
