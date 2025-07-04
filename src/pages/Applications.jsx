import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allAiTools } from '../Data/aiTools';
import Loader from "../components/Loader";
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiExternalLink, FiStar, FiFilter, FiChevronDown, FiX, FiMenu, FiDollarSign } from 'react-icons/fi';
import { FaRobot, FaChartLine, FaPalette, FaCode, FaBrain, FaSearch, FaMusic, FaGraduationCap } from 'react-icons/fa';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Category Icons
const categoryIcons = {
  'All': <FaRobot className="mr-2" />,
  'Conversational AI': <FaRobot className="mr-2" />,
  'Image Generation': <FaPalette className="mr-2" />,
  'Productivity': <FaChartLine className="mr-2" />,
  'Video AI': <FaCode className="mr-2" />,
  'Writing Assistant': <FaBrain className="mr-2" />,
  'Marketing AI': <FaChartLine className="mr-2" />,
  'Search AI': <FaSearch className="mr-2" />,
  'Audio Generation': <FaMusic className="mr-2" />,
  'Design Tools': <FaPalette className="mr-2" />,
  'Development': <FaCode className="mr-2" />,
  'Education': <FaGraduationCap className="mr-2" />
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded-full w-4/6 animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

const Applications = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTools, setFilteredTools] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Group tools by category
  const toolsByCategory = React.useMemo(() => 
    allAiTools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    }, {}),
    []
  );

  // Get all categories with counts
  const categories = React.useMemo(() => {
    const allCats = ['All', ...Object.keys(toolsByCategory)];
    return allCats.map(category => ({
      name: category,
      icon: categoryIcons[category] || <FaRobot className="mr-2" />,
      count: toolsByCategory[category]?.length || 0
    }));
  }, [toolsByCategory]);

  // Auth state and scroll effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter tools based on search and category
  useEffect(() => {
    let results = [];
    
    // Get tools based on selected category
    if (selectedCategory === 'All') {
      // Get first 6 tools from each category
      Object.values(toolsByCategory).forEach(categoryTools => {
        results.push(...categoryTools.slice(0, 6));
      });
    } else {
      results = [...(toolsByCategory[selectedCategory] || [])];
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }
    
    setFilteredTools(results);
  }, [searchTerm, selectedCategory, toolsByCategory]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Tool Card Component
  const ToolCard = ({ tool }) => {
    return (
      <motion.div 
        variants={item}
        className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-48 overflow-hidden mb-4">
          <img
            src={tool.imageUrl || 'https://source.unsplash.com/random/600x400/?ai,technology'}
            alt={tool.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://source.unsplash.com/random/600x400/?technology,ai';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm rounded-full">
                {tool.category || 'AI Tool'}
              </span>
              {tool.tags?.slice(0, 2).map((tag, i) => (
                <span key={i} className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {tool.rating ? tool.rating.toFixed(1) : '4.5'}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
            {tool.description}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiDollarSign className="mr-1.5 w-4 h-4" />
              {tool.pricing || 'Free'}
            </span>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group/button inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Visit Site</span>
              <FiExternalLink className="ml-2 w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/button:opacity-100 group-hover/button:translate-x-0 transition-all duration-200" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  // Handle search query change
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category === 'All' ? 'All' : category);
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <main className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              {allAiTools.length}+ AI Tools
            </span>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
              Discover & Explore AI Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Find the perfect AI tools to supercharge your workflow and boost productivity
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            className={`sticky top-4 z-10 mb-8 transition-all duration-300 ${isScrolled ? 'px-4 py-2 -mx-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg' : ''}`}
            initial={false}
            animate={{ 
              y: isScrolled ? 0 : 0,
              scale: isScrolled ? 0.98 : 1,
              transition: { type: 'spring', stiffness: 300, damping: 30 }
            }}
          >
            <div className="relative max-w-lg group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  className="w-full px-6 py-4 rounded-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-200 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {['All', 'Productivity', 'Creative', 'Development', 'Business'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80'
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* AI Tools Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-6 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full animate-pulse"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6 animate-pulse"></div>
                    </div>
                    <div className="mt-6 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : filteredTools.length === 0 ? (
            <motion.div 
              className="text-center py-20 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-6">
                <FiSearch className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No tools found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any tools matching your search. Try adjusting your filters or search term.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence>
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <ToolCard tool={tool} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Applications;
