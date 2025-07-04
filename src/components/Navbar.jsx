import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { auth } from '../Firebase/firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => unsubscribe();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navBackground = 'bg-gray-900/80 backdrop-blur-sm';
  const textColor = 'text-white hover:text-blue-100';
  const mobileTextColor = 'text-white hover:text-blue-100';

  return (
    <>
      {/* Blur overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <header className={`w-full z-50 ${navBackground} fixed top-0 left-0 right-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              AIVERSE
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/applications" className={`${textColor} text-sm font-medium transition-colors`}>
              AI Tools
            </Link>
            <Link to="/#features" className={`${textColor} text-sm font-medium transition-colors`}>
              Features
            </Link>
            <Link to="/blog" className={`${textColor} text-sm font-medium transition-colors`}>
              Blog
            </Link>
            <Link to="/learnai" className={`${textColor} text-sm font-medium transition-colors`}>
              Resources
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white"
              >
                {auth.currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-blue-100"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-white" />
            ) : (
              <FiMenu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween' }}
            className="md:hidden shadow-lg overflow-hidden fixed top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50"
          >
            <div className="px-4 py-3 space-y-4">
              <Link to="/applications" className={`block ${mobileTextColor} py-2`}>AI Tools</Link>
              <Link to="/#features" className={`block ${mobileTextColor} py-2`}>Features</Link>
              <Link to="/blog" className={`block ${mobileTextColor} py-2`}>Blog</Link>
              <Link to="/learnai" className={`block ${mobileTextColor} py-2`}>Resources</Link>
              <div className="pt-2 mt-2 border-t border-gray-200">
                {isLoggedIn ? (
                  <Link 
                    to="/profile" 
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    My Profile
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      className="block text-center text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Navbar;
