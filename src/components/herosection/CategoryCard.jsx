import React from 'react';

export default function CategoryCard({ icon, name, onClick }) {
  return (
      <div onClick={onClick}  className="flex flex-col items-center p-4 bg-white rounded-lg  transition-shadow">
      <div className="p-3 bg-blue-100 rounded-full">
        {icon}
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
}
