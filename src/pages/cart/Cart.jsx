import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import MyContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

const CartPage = () => {
  const context = useContext(MyContext);
  const { deleteFromCart, updateCart, fetchCart } = context;

  const [items, setItems] = useState([]);

  // Fetch cart items on mount
  useEffect(() => {
    async function loadCart() {
      const cartItems = await fetchCart();
      setItems(cartItems || []);
    }
    loadCart();
  }, [fetchCart]);

  // Calculate subtotal
 const total = useMemo(() => {
  return items.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
}, [items]);


  const shippingCost = total >= 99 ? 0 : 10;
  const taxRate = 0.08;
  const tax = total * taxRate;
  const orderTotal = total + shippingCost + tax;

  // Handler to update quantity
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // You can optionally handle invalid quantity here
      return;
    }
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (!itemToUpdate) return;

    const updatedItem = { ...itemToUpdate, quantity: newQuantity };
    await updateCart(updatedItem);

    // Update local state
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? updatedItem : item))
    );
  };

  // Handler to delete item
  const handleDelete = async (itemId) => {
    await deleteFromCart(itemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

 

  if (!items.length) {
    return (
      <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block p-6 rounded-full bg-gray-100 mb-6">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Start shopping to find amazing products!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/products/${item.productId}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4 text-lg font-medium text-blue-600">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 flex-1 flex items-end justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-gray-900"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-gray-900"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between">
               
                <Link
                  to="/allproducts"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="flow-root">
                <div className="border-t border-b border-gray-200 py-4">
                  <dl className="divide-y divide-gray-200">
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="text-gray-900 font-medium">${total.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd className="text-gray-900 font-medium">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-gray-600">Tax (8%)</dt>
                      <dd className="text-gray-900 font-medium">${tax.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-lg font-semibold text-gray-900">Total</dt>
                      <dd className="text-lg font-bold text-blue-600">${orderTotal.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <Link
                to=""
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CartPage;
