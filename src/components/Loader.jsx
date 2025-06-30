import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-300 tracking-wider font-mono">
          Loading AIVERSE...
        </p>
      </div>
    </div>
  );
};

export default Loader;
