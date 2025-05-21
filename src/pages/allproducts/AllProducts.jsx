import React, { useContext, useState } from 'react';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/productCard/ProductCard';
import myContext from '../../context/data/myContext';

const categories = [
  
  { name: "Electronics" },
  { name: "Footwear" },
  
  { name: "Home" },
  { name: "Accessories" },
  { name: "Women's Fashion" },
  { name: "Men's Fashion" },
  
];

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { setFilterType, setFilterPrice } = useContext(myContext);

  const handleAllProductsClick = () => {
    setSelectedCategory('');
    setFilterType('');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFilterType(category);
  };

  return (
    <Layout>
      <div className="container min-h-screen mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">PRODUCTS</h3>
              <div className="space-y-2">
                {/* All Products Button */}
                <button
                  onClick={handleAllProductsClick}
                  className={`block w-full text-left px-3 py-2 rounded-md ${selectedCategory === ''
                    ? 'bg-[#155DFC] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  All Products
                </button>

                {/* All Categories */}
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${selectedCategory === category.name
                      ? 'bg-[#155DFC] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4 space-y-6">
            {/* Price Range Filter */}
            <div className="flex justify-end">
              <select
                onChange={(e) => setFilterPrice(e.target.value)}
                className="block w-48 text-sm px-3 py-2 rounded-md text-gray-600 border border-gray-300"
              >
                <option value="">Filter by Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>

            {/* Products (Placeholder) */}
            <ProductCard />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllProducts;
