import React, { useState, useContext } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import MyContext from '../../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';


export function LoginPage() {
  const context=useContext(MyContext)
  const {loading,setLoading}=context;
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
 
  const navigate = useNavigate();
  


   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', JSON.stringify(result));
      navigate("/");
    } catch (error) {
      console.log('Signin Failed');
    }
    setLoading(false);
  };

  const fillAdminCredentials = () => {
    setEmail('admin123@gmail.com');
    setPassword('Admin@123');
  };

  const fillUserCredentials = () => {
    setEmail('user123@gmail.com');
    setPassword('user123');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          

          <form className="space-y-6" onSubmit={handleSubmit}>
             {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-70 rounded-md">
                <Loader />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="w-full py-2 px-4 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Use Admin Account
              </button>
              <button
                type="button"
                onClick={fillUserCredentials}
                className="w-full py-2 px-4 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Use Customer Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
