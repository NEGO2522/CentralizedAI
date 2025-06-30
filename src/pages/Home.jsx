import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

// Using direct image URLs
const aiHeroImage = 'https://dlabs.ai/wp-content/uploads/2021/08/AI-outsmart-humans-1024x538.png';
const aiChipImage = 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png';
const mlBrainImage = 'https://cdn-icons-png.flaticon.com/512/1998/1998664.png';
const robotImage = 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={aiHeroImage} 
            alt="AI Technology" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900 to-gray-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Welcome to AIVERSE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Explore the Universe of AI, ML & Robotics. Your gateway to 50+ intelligent tools transforming tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/applications"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Discover AI Tools
            </Link>
            <Link
              to="/learnai"
              className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 text-lg font-semibold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1"
            >
              Learn AI
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Explore Our AI Universe
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover powerful tools and resources across different AI domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI & Automation Card */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <img src={aiChipImage} alt="AI Chip" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-center text-blue-400 mb-4">AI & Automation</h3>
              <p className="text-gray-300 text-center">
                Find tools that write content, code, generate images, videos, and automate repetitive tasks using cutting-edge artificial intelligence.
              </p>
            </div>

            {/* Machine Learning Card */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <img src={mlBrainImage} alt="ML Brain" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-center text-green-400 mb-4">Machine Learning</h3>
              <p className="text-gray-300 text-center">
                Explore ML-based platforms and models that learn, predict, and adapt — from data analytics to language models.
              </p>
            </div>

            {/* Robotics & Vision Card */}
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <img src={robotImage} alt="Robot Vision" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-center text-purple-400 mb-4">Robotics & Vision</h3>
              <p className="text-gray-300 text-center">
                Dive into AI-enhanced vision systems, robot control tools, and futuristic innovations powering the next-gen robotics revolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white,transparent)]"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the AI Revolution with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AIVERSE</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            A platform built by students, for the curious minds of tomorrow. Stay ahead with AI tools, blogs, and community support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/blog"
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Read Our Blog
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1 hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
