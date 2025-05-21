import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

function NotFound() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
      <Layout>
        <div className="min-h-[28rem] flex flex-col justify-center items-center bg-white text-center">
            <div className="mb-4 text-gray-500">
                <span>Home</span> / <span>404 Error</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404 Not Found</h1>
            <p className="text-gray-600 mb-8">Your visited page not found. You may go home page.</p>
            <button 
                onClick={goHome} 
                className="px-6 py-3 bg-[#3976FD] text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
                Back to home page
            </button>
        </div>
        </Layout>
    );
}

export default NotFound;
