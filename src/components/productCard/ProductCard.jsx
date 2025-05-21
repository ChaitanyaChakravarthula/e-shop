import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { ShoppingCart, Star } from 'lucide-react';

function ProductCard() {
    const context = useContext(myContext);
    const { products, searchkey, filterType, filterPrice,addToCart } = context;
    const navigate = useNavigate();

    const [visibleCount, setVisibleCount] = useState(8);

    const filteredProducts = products
        .filter((item) =>
            item.name?.toLowerCase().includes((searchkey || '').toLowerCase())
        )
        .filter((item) =>
            filterType
                ? item.category?.toLowerCase() === filterType.toLowerCase()
                : true
        )
        .sort((a, b) => {
            if (filterPrice === 'low-to-high') return a.price - b.price;
            if (filterPrice === 'high-to-low') return b.price - a.price;
            return 0;
        });

    const loadMoreProducts = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    const handleProductClick = (id) => {
        navigate(`/productinfo/${id}`);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"> Explore Our Products</h1>
                <div className="h-0.5 w-20 bg-[#4D097B] rounded"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.image || ''}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {!product.inStock && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    Out of Stock
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                            <div className="flex items-center mb-2">
                                <div className="flex items-center text-yellow-400 mr-2">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm ml-1">{Number(product.rating || 0).toFixed(1)}</span>
                                </div>

                                <span className="text-sm text-gray-500">{product.category}</span>
                            </div>
                            {/* <p className="text-xl font-bold text-blue-600 mb-3">₹{product.price?.toFixed(2)}</p>
                             */}
                            <p className="text-xl font-bold text-blue-600 mb-3">
                                ${Number(product.price || 0).toFixed(2)}
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                disabled={!product.inStock}
                                className={`flex items-center justify-center px-4 py-2 rounded w-full transition-colors ${product.inStock
                                    ? 'bg-[#155DFC] text-white hover:bg-blue-900'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <ShoppingCart size={16} className="mr-2" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < filteredProducts.length && (
                <div className="text-center mt-6 sm:mt-8">
                    <button
                        onClick={loadMoreProducts}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-900 transition-colors duration-300 text-sm sm:text-base"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
}

export default ProductCard;
