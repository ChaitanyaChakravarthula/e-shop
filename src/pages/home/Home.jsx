import React, { useContext } from 'react';

import HeroSection from '../../components/herosection/HeroSection';
import FeaturesSection from '../../components/herosection/FeaturesSection';
import TopRatedProductsSection from '../../components/herosection/TopRatedProductsSection';
import CategoriesSection from '../../components/herosection/CategoriesSection';
import NewsletterSection from '../../components/herosection/NewsletterSection';
import Layout from '../../components/layout/Layout';
import MyContext from '../../context/data/myContext';

const HomePage = () => {
  const context=useContext(MyContext)
  const {products}=context;

  const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);



  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TopRatedProductsSection topRatedProducts={topRatedProducts} />
      <CategoriesSection  />
      <NewsletterSection />
    </div>
    </Layout>
  );
};

export default HomePage;
