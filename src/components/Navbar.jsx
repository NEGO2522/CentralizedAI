import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Using lucide icons for a modern touch

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Don't render the navbar on the home page
  if (isHomePage) {
    return null;
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Applications', path: '/applications' },
    { name: 'Learn AI', path: '/learnai' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500 tracking-wide">
          AIVERSE
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="hover:text-blue-400 transition duration-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block py-1 text-gray-300 hover:text-blue-400 border-b border-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
