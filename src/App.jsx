import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Applications from './pages/Applications';
import LearnAI from './pages/LearnAI';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />

      <main className="flex-grow px-4 sm:px-6 md:px-10 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/learnai" element={<LearnAI />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
