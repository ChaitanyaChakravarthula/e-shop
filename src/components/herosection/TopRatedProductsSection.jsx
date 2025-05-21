import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/allproducts');
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">${Number(product.price).toFixed(2)}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
    </div>
  );
};

const TopRatedProductsSection = ({ topRatedProducts }) => {
  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Products</h2>
          <Link to="/allproducts" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedProductsSection;
