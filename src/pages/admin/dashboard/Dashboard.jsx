import React, { useContext } from 'react';
import { AlertTriangle } from 'lucide-react';
import MyContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { products } = useContext(MyContext);
    const navigate = useNavigate();

    // Dynamic calculations
    const totalProducts = products.length;

    const productsInStock = products.filter(p => p.inStock > 0).length;

    const productsOutOfStock = products.filter(p => p.inStock == false).length;

    const avgPrice =128;


    const categoryCounts = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    return (
        <Layout>
            <div className='min-h-[80vh]'>
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* Total Products */}
                        <Card title="Total Products" value={totalProducts} iconColor="bg-blue-100" svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                            </svg>
                        } />

                        {/* In Stock */}
                        <Card title="In Stock" value={productsInStock} iconColor="bg-green-100" svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        } />

                        {/* Out of Stock */}
                        <Card title="Out of Stock" value={productsOutOfStock} iconColor="bg-yellow-100" svg={<AlertTriangle className="text-yellow-600" size={24} />} />

                        {/* Avg Price */}
                        <Card title="Average Price" value={`$${avgPrice}`} iconColor="bg-purple-100" svg={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2 .9 2 2-.9 2-2 2M12 2v2m6.36 1.64l-1.42 1.42M20 12h-2M17.66 17.66l-1.42-1.42M12 20v-2M6.34 17.66l1.42-1.42M4 12H2m3.64-6.36l1.42 1.42" />
                            </svg>
                        } />
                    </div>

                    {/* Optional: Display category breakdown */}
                    {/* <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Products by Category</h2>
                        <ul className="list-disc pl-5">
                            {Object.entries(categoryCounts).map(([category, count]) => (
                                <li key={category}>
                                    <strong>{category}:</strong> {count}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>

                <div className="grid grid-cols-1 px-54 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-4">
                                {Object.entries(categoryCounts).map(([category, count]) => (
                                    <div key={category} className="flex items-center justify-between">
                                        <div className="text-sm font-medium text-gray-900">{category}</div>
                                        <div className="text-sm text-gray-500">{count} products</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate('/admin/products')}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Manage Products
                                </button>
                                <button
                                    onClick={() => navigate('/admin/orders')}
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    View Orders
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Manage Customers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const Card = ({ title, value, iconColor, svg }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className={`p-3 rounded-full ${iconColor}`}>
            {svg}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    </div>
);

export default AdminDashboard;
