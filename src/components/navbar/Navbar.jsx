import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import MyContext from '../../context/data/myContext';

export default function Navbar() {
  const context = useContext(MyContext);
  const { fetchCart, searchkey, setSearchkey } = context;
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem('user')) || null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchkey.trim()) {
      navigate('/allproducts');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserCart = async () => {
      if (user) {
        const res = await fetchCart(user?.user?.email);
        setCartItems(res);
      }
    };
    fetchUserCart();
  }, [user, fetchCart]);

  const cartItemCount = cartItems?.reduce((acc, item) => acc + Number(item.quantity), 0) || 0;

  return (
    <nav className="bg-white sticky top-0 px-6 md:px-20 z-100 w-full shadow-md">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <Link to="/" className="text-blue-600 font-bold text-xl">ShopHub</Link>

        {/* Search (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:block flex-1 mx-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-9">
          <Link to="/" className="text-gray-600 hover:text-blue-600">HOME</Link>
          <Link to="/allproducts" className="text-gray-600 hover:text-blue-600">PRODUCTS</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">CONTACT</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">ABOUT</Link>
          {user?.user?.email === 'admin123@gmail.com' && (
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">ADMIN</Link>
          )}
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Account Dropdown */}
          <div className="relative z-40">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {isAccountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-[#2B2B2B] text-white rounded-lg shadow-lg py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium">Welcome!</p>
                      <p className="text-xs text-gray-400 truncate">{user.user?.email}</p>
                    </div>
                    <Link to="/myorder" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
                      <ShoppingCart className="h-4 w-4 mr-3" />
                      My Order
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 w-full"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block text-center text-white hover:text-purple-600">
                    LOGIN / SIGNUP
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile - Account Dropdown Only */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative text-gray-700 mr-4">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            className="text-gray-700"
          >
            {isAccountDropdownOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isAccountDropdownOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </div>
            </div>
          </form>
          <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
          <Link to="/allproducts" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Products</Link>
          <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Contact</Link>
          <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">About</Link>

          {user?.user?.email === 'admin123@gmail.com' && (
            <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Admin</Link>
          )}
          {user ? (
            <>
              <Link to="/myorder" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">My Order</Link>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-3 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
