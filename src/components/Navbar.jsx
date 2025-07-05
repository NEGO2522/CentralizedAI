import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { auth } from '../Firebase/firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Protected navigation handler
  const handleProtectedNav = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login', { state: { from: path } });
    }
  };

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <Link 
              to="/applications" 
              className={`${textColor} text-sm font-medium transition-colors`}
              onClick={(e) => handleProtectedNav(e, '/applications')}
            >
              AI Tools
            </Link>
            <Link 
              to="/blog" 
              className={`${textColor} text-sm font-medium transition-colors`}
              onClick={(e) => handleProtectedNav(e, '/blog')}
            >
              Blog
            </Link>
            <Link 
              to="/learnai" 
              className={`${textColor} text-sm font-medium transition-colors`}
              onClick={(e) => handleProtectedNav(e, '/learnai')}
            >
              Resources
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {auth.currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
                </button>
                
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-200 border-b border-gray-700">
                      <p className="font-medium">{auth.currentUser?.displayName || 'User'}</p>
                      <p className="text-xs text-gray-400 truncate">{auth.currentUser?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        auth.signOut();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
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
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 shadow-lg z-40"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    to="/applications"
                    onClick={(e) => {
                      handleProtectedNav(e, '/applications');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                  >
                    AI Tools
                  </Link>
                  <Link
                    to="/blog"
                    onClick={(e) => {
                      handleProtectedNav(e, '/blog');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/learnai"
                    onClick={(e) => {
                      handleProtectedNav(e, '/learnai');
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                  >
                    Resources
                  </Link>
                  {!isLoggedIn && (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-blue-400 hover:bg-gray-700"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
