import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'; // ✅ Make sure the path is correct

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          Welcome to AIVERSE
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Explore the Universe of AI, ML & Robotics. Your gateway to 50+ intelligent tools transforming tomorrow.
        </p>
        <Link
          to="/applications"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition"
        >
          Discover AI Tools
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">🤖 AI & Automation</h3>
            <p className="text-gray-300">
              Find tools that write content, code, generate images, videos, and automate repetitive tasks using cutting-edge artificial intelligence.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-green-400 mb-2">📊 Machine Learning</h3>
            <p className="text-gray-300">
              Explore ML-based platforms and models that learn, predict, and adapt — from data analytics to language models.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">🦾 Robotics & Vision</h3>
            <p className="text-gray-300">
              Dive into AI-enhanced vision systems, robot control tools, and futuristic innovations powering the next-gen robotics revolution.
            </p>
          </div>
        </div>
      </div>

      {/* Community CTA */}
      <div className="text-center py-16 px-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          Join the AI Revolution with AIVERSE
        </h2>
        <p className="text-gray-400 mb-6">
          A platform built by students, for the curious minds of tomorrow. Stay ahead with AI tools, blogs, and community support.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link
            to="/blog"
            className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition"
          >
            Read Blogs
          </Link>
          <Link
            to="/contact"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-700 text-sm">
        © {new Date().getFullYear()} AIVERSE — Built with 💙 by Kshitij Jain
      </footer>
    </div>
  );
};

export default Home;
