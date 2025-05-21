import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext'
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';

function AddProduct() {
    const { product, setProduct, addProduct } = useContext(myContext);
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/admin/products');
    }


    return (
        <Layout>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addProduct();
                }}
                className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
            >
                <h1 className="text-center text-xl font-bold text-gray-800">Add Product</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="title"
                        value={product.name || ''}
                        onChange={(e) => setProduct({ ...product, name: e.target.value, quantity: 1 })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Product title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={3}
                        value={product.description || ''}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Product description"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">$</span>
                            </div>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="price"
                                value={product.price || ''}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                className="block w-full pl-7 pr-12 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Price"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={product.category || ''}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Electronics">Electronics</option>
                        
                            <option value="Footwear">Footwear</option>
                            <option value="Home">Home</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Women's Fashion">Women's Fashion</option>
                            <option value="Men's Fashion">Men's Fashion</option>

                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={product.image || ''}
                            onChange={(e) => setProduct({ ...product, image: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Product image URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            name="rating"
                            value={product.rating || ''}
                            onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Rating"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={product.inStock || false}
                            onChange={(e) => setProduct({ ...product, inStock: e.target.checked })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">In Stock</label>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={handleCancel} // reset form
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
        </Layout>
    )
}

export default AddProduct
