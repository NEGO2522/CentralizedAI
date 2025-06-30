import React from 'react';

const ToolCard = ({ name, description, image, link }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-contain mb-4 rounded-full border border-gray-200 mx-auto"
      />
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4 text-center">{description.slice(0, 100)}...</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white text-center rounded-full py-2 px-4 mt-auto hover:bg-blue-700 transition"
      >
        Visit Tool
      </a>
    </div>
  );
};

export default ToolCard;
