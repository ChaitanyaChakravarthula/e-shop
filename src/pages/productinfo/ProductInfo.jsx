import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, RefreshCw, ArrowLeft } from 'lucide-react';
import MyContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const { products, addToCart } = context;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/allproducts"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, 1); // Always add quantity 1 since no quantity selector
  };

  const safeRating = Number(product.rating) || 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill={star <= Math.round(safeRating) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-gray-600">{safeRating.toFixed(1)} rating</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-600 mb-4">
              ${Number(product.price).toFixed(2)}
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="mr-2 font-medium">Category:</span>
                <span>{product.category}</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2 font-medium">Availability:</span>
                <span className={`${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center">
                <Truck size={20} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Free shipping over $99</span>
              </div>
              <div className="flex items-center">
                <Shield size={20} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Secure payment</span>
              </div>
              <div className="flex items-center">
                <RefreshCw size={20} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-400 mr-2">
                          <Star size={16} fill="currentColor" />
                          <span className="text-sm ml-1">
                            {Number(relatedProduct.rating).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        ${Number(relatedProduct.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
