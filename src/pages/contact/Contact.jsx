import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Layout from '../../components/layout/Layout';

function Contact() {
    return (
        <Layout>
        <div className=" bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <Phone className="h-6 w-6 text-[#4D097B] mr-3" />
                            <h2 className="text-lg font-semibold text-gray-800">Call To Us</h2>
                        </div>
                        <p className="text-gray-600">We are available 24/7, 7 days a week.</p>
                        <p className="text-gray-600 font-semibold mt-2">Phone: +9391252481</p>
                        <hr className="my-6" />
                        <div className="flex items-center mb-4">
                            <Mail className="h-6 w-6 text-[#4D097B] mr-3" />
                            <h2 className="text-lg font-semibold text-gray-800">Write To US</h2>
                        </div>
                        <p className="text-gray-600 mb-2">Fill out our form and we will contact you within 24 hours.</p>
                        <p className="text-gray-600">Emails: chaitanyachakravarthula206@gmail.com</p>
                        <p className="text-gray-600">support@chaitanya.com</p>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <input 
                                type="text" 
                                placeholder="Your Name *" 
                                className="border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4D097B]"
                            />
                            <input 
                                type="email" 
                                placeholder="Your Email *" 
                                className="border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4D097B]"
                            />
                            <input 
                                type="text" 
                                placeholder="Your Phone *" 
                                className="border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4D097B]"
                            />
                        </div>
                        <textarea 
                            placeholder="Your Message" 
                            className="w-full border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#4D097B]"
                        ></textarea>
                        <button 
                            className="mt-4 bg-[#1d50b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3c4368] transition-colors"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Contact;
