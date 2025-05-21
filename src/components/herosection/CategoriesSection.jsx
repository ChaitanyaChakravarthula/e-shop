import React, { useContext } from 'react';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import {
  Smartphone,
  ShoppingBag,
  Shirt,
  LampDesk,
  Gem,
  UserRound,
  UsersRound,
} from 'lucide-react';

function CategoriesSection() {
  const context = useContext(myContext);
  const { setFilterType } = context;
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setFilterType(category);
    navigate('/allproducts');
  };

  const categories = [
    { name: "Electronics", icon: Smartphone },
    { name: "Footwear", icon: ShoppingBag },
    { name: "Home", icon: LampDesk },
    { name: "Accesories", icon: Gem },
    { name: "Women's Fashion", icon: UserRound },
    { name: "Men's Fashion", icon: UsersRound },
  ];

  return (
    <div className="py-9">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse By Category</h2>
        <div className="flex justify-between items-center gap-4 overflow-x-auto">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              icon={
                <div className="bg-blue-100 py-5 px-5 rounded-full">
                  <cat.icon className="h-6 w-6 text-[#193CB8]" />
                </div>
              }
              name={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesSection;
