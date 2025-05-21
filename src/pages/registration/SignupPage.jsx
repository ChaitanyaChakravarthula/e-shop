import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../../context/data/myContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import Loader from '../../components/loader//Loader'; // Assuming you have a Loader component

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();

  const signup = async () => {
    setLoading(true);
    if (name === '' || email === '' || password === '') {
      setLoading(false);
      return;
    }

    try {
      const userRef = collection(fireDB, 'users');
      const querySnapshot = await getDocs(query(userRef, where('email', '==', email)));

      if (!querySnapshot.empty) {
        console.log('User already exists. Please login instead.');
        navigate('/login');
        setLoading(false);
        return;
      }

      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        cart: [],
        orders: [],
        time: Timestamp.now(),
      };

      await addDoc(userRef, user);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        navigate('/login');
      } else {
        console.error(error.message);
      }
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    signup();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Create a new account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10 rounded-md">
              <Loader />
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`block w-full px-3 py-2 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm sm:text-sm`}
              />
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
