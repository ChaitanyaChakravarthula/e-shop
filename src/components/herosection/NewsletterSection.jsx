import React from 'react';

const NewsletterSection = () => (
  <section className="py-12 bg-blue-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 opacity-90">
          Get the latest updates on new products, special offers, and sales.
        </p>
        <form className="flex flex-col sm:flex-row w-full max-w-md mx-auto gap-4">
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
            required
            className="px-4 py-3 rounded-lg flex-grow text-white-900 focus:outline-none border border-white focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default NewsletterSection;
