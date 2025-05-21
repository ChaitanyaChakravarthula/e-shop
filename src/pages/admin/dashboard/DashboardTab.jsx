import React, { useContext, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import myContext from '../../../context/data/myContext';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';

function DashboardTab() {
    const { products, edithandle, deleteProduct } = useContext(myContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const addProduct = () => {
        navigate("/addproduct");
    };

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-7xl min-h-screen mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Product Management</h1>
                    <button
                        onClick={addProduct}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        className="pl-10 py-2 w-full border rounded-md"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm">
                                <th className="p-4">Product</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Rating</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((prod) => (
                                    <tr key={prod.id} className="border-t">
                                        <td className="p-4 flex items-center gap-3">
                                            <img
                                                src={prod.image}
                                                alt={prod.name}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium">{prod.name}</p>
                                                <p className="text-sm text-gray-500 max-w-[200px] truncate">
                                                    {prod.description}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">{prod.category}</td>
                                        <td className="p-4">${Number(prod.price).toFixed(2)}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium w-fit inline-block min-w-[100px] text-center ${
                                                    prod.inStock
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {prod.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="p-4">{Number(prod.rating).toFixed(1)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 cursor-pointer text-black">
                                                <Link to="/updateproduct">
                                                    <button onClick={() => edithandle(prod)}>✏️ Edit</button>
                                                </Link>
                                                <button onClick={() => deleteProduct(prod)}>🗑️ Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardTab;
