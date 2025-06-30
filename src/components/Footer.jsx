import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
        {/* AIVERSE Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">AIVERSE</h2>
          <p className="text-gray-400">
            Your ultimate hub for exploring AI tools, learning resources, and tech blogs — built for future minds.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/applications" className="hover:text-white">Applications</Link></li>
            <li><Link to="/learnai" className="hover:text-white">Learn AI</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:kshitij@example.com" className="hover:text-white">kshitij@example.com</a></li>
            <li>Location: Jaipur, India</li>
            <li><Link to="/contact" className="hover:text-white">Contact Form</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>
          <ul className="space-y-2">
            <li><a href="https://linkedin.com/in/kshitij" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
            <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
            <li><a href="#" className="hover:text-white">YouTube (Coming Soon)</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} AIVERSE. Crafted with ❤️ by Kshitij Jain.
      </div>
    </footer>
  );
};

export default Footer;
