import React, { useState, useEffect } from 'react';
import { allAiTools } from '../Data/aiTools';
import Loader from "../components/Loader";

const Applications = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">AI Tools & Applications</h1>
        <p className="text-center text-gray-600 mb-10">
          Explore 50+ real-world AI tools across various categories like text, image, video, code, productivity and more.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allAiTools.map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{tool.name}</h2>
              <p className="text-sm text-blue-500 mb-2">{tool.category}</p>
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Visit Tool
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
