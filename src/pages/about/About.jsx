import React from 'react';
import { Star } from 'lucide-react';
import Layout from '../../components/layout/Layout';

export default function About() {
  const stats = [
    { number: '10.5k', label: 'Sellers active on our site' },
    { number: '33k', label: 'Monthly Product Sale' },
    { number: '45.5k', label: 'Customer active on our site' },
    { number: '25k', label: 'Annual gross sale on our site' },
  ];

  const team = [
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop',
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop',
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop',
    },
  ];

  const primaryColor = '#437DFC';

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section: Our Story */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: primaryColor }}>
            Our Story
          </h1>
          <div className="flex justify-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&fit=crop"
              alt="Shopping"
              className="rounded-lg w-full max-w-2xl"
            />
          </div>
          <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in
            Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has
            10,500 sellers and 300 brands and serves 3 million customers across the region.
          </p>
        </div>

        {/* Section: Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section: Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: primaryColor }}>
                {member.name}
              </h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <Star className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: primaryColor }} />
                <Star className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: primaryColor }} />
                <Star className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: primaryColor }} />
              </div>
            </div>
          ))}
        </div>

        {/* Section: Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center p-6 sm:p-8 border rounded-lg" style={{ borderColor: primaryColor }}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Free delivery for all orders over $140</p>
          </div>
          <div className="text-center p-6 sm:p-8 border rounded-lg" style={{ borderColor: primaryColor }}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              24/7 CUSTOMER SERVICE
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Friendly 24/7 customer support</p>
          </div>
          <div className="text-center p-6 sm:p-8 border rounded-lg" style={{ borderColor: primaryColor }}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              MONEY BACK GUARANTEE
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
