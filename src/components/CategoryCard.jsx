import React from 'react';

const CategoryCard = ({ name, icon, toolCount, onClick }) => {
  return (
    <div
      className="bg-gray-900 text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:bg-gray-800"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 p-3 rounded-full text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
      <p className="text-sm text-gray-400">{toolCount} tools available</p>
    </div>
  );
};

export default CategoryCard;
