import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allAiTools } from '../Data/aiTools';
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiExternalLink, FiStar, FiFilter, FiChevronDown, FiX, FiMenu, FiDollarSign } from 'react-icons/fi';
import { FaRobot, FaChartLine, FaPalette, FaCode, FaBrain, FaSearch, FaMusic, FaGraduationCap, FaGoogle, FaMicrosoft, FaLanguage, FaFilm, FaImage, FaPencilAlt, FaHeadphones, FaFilePowerpoint, FaPencilRuler } from 'react-icons/fa';
import { SiOpenai, SiAnthropic, SiAdobe, SiNotion, SiElevenlabs, SiGrammarly, SiQuora, SiHuggingface } from 'react-icons/si';
import { RiPencilRuler2Line } from 'react-icons/ri';
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
  'Multimodal AI': <FaRobot className="mr-2" />,
  'Search AI': <FaSearch className="mr-2" />,
  'Image Generation': <FaPalette className="mr-2" />,
  'Image & Video': <FaFilm className="mr-2" />,
  'Audio Generation': <FaMusic className="mr-2" />,
  'Productivity': <FaChartLine className="mr-2" />,
  'Marketing AI': <FaChartLine className="mr-2" />,
  'Video AI': <FaFilm className="mr-2" />,
  'Video Generation': <FaFilm className="mr-2" />,
  'Translation AI': <FaLanguage className="mr-2" />,
  'Writing Assistant': <FaPencilAlt className="mr-2" />,
  'Art AI': <FaPalette className="mr-2" />,
  'Audio & Video': <FaHeadphones className="mr-2" />,
  'Presentation AI': <FaFilePowerpoint className="mr-2" />,
  'Design Tools': <FaPencilRuler className="mr-2" />,
  'Education': <FaGraduationCap className="mr-2" />,
  'Development': <FaCode className="mr-2" />,
  'Business': <FaChartLine className="mr-2" />,
  'Creative': <FaPalette className="mr-2" />,
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
  const [searchQuery, setSearchQuery] = useState('');
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
  const toolsByCategory = React.useMemo(() => {
    const categories = {};
    allAiTools.forEach(tool => {
      if (!categories[tool.category]) {
        categories[tool.category] = [];
      }
      categories[tool.category].push(tool);
    });
    return categories;
  }, [allAiTools]);

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

  // Filter tools based on search query and category
  useEffect(() => {
    let results = [];
    
    // Get tools based on selected category
    if (selectedCategory === 'All') {
      // Get all tools
      results = [...allAiTools];
    } else {
      results = [...(toolsByCategory[selectedCategory] || [])];
    }
    
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      results = results.filter(tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }
    
    setFilteredTools(results);
  }, [searchQuery, selectedCategory, toolsByCategory]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get tool logo URL using Clearbit
  const getToolLogo = (toolName, size = 40) => {
    // Map of tool names to their respective domains for Clearbit
    const toolDomains = {
      'ChatGPT': 'openai.com',
      'Claude': 'anthropic.com',
      'Midjourney': 'midjourney.com',
      'DALL-E': 'openai.com/dall-e',
      'Stable Diffusion': 'stability.ai',
      'GitHub Copilot': 'github.com',
      'Notion AI': 'notion.so',
      'ElevenLabs': 'elevenlabs.io',
      'Grammarly': 'grammarly.com',
      'Runway': 'runwayml.com',
      'Jasper': 'jasper.ai',
      'Quillbot': 'quillbot.com',
      'Hugging Face': 'huggingface.co',
      'Firefly': 'adobe.com',
      'Bard': 'google.com',
      'Bing Chat': 'bing.com',
      'DeepL': 'deepl.com',
      'Synthesia': 'synthesia.io',
      'Tome': 'tome.app',
      'Canva': 'canva.com',
      'Microsoft Copilot': 'microsoft.com',
      'Google Gemini': 'google.com',
      'Runway ML': 'runwayml.com'
    };

    // Find matching domain or use tool name for fallback
    const domain = Object.entries(toolDomains).find(([key]) => 
      toolName.toLowerCase().includes(key.toLowerCase())
    )?.[1] || toolName.toLowerCase().replace(/\s+/g, '') + '.com';

    // Return Clearbit URL with fallback to UI Avatars if needed
    return `https://logo.clearbit.com/${domain}?size=${size}`;
  };

  // Tool Card Component
  const ToolCard = ({ tool }) => {
    return (
      <motion.div 
        variants={item}
        className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-48 overflow-hidden mb-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={getToolLogo(tool.name, 120)}
              alt={tool.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&size=120`;
              }}
            />
          </div>
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

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category === 'All' ? 'All' : category);
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoggedIn={isLoggedIn} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        {!isScrolled && (
          <motion.div
            className="text-center mb-12"
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
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {['All', ...Object.entries(toolsByCategory)
                  .sort(([catA], [catB]) => catA.localeCompare(catB))
                  .map(([category]) => category)]
                  .map((category) => (
                    <button
                      key={category}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">
                          {categoryIcons[category] || categoryIcons['All']}
                        </span>
                        <span>{category}</span>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {category === 'All' 
                          ? allAiTools.length 
                          : (toolsByCategory[category] || []).length}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <motion.div 
              className="sticky top-4 z-10 mb-8 transition-all duration-300"
              initial={false}
              animate={{ 
                y: isScrolled ? 0 : 0,
                scale: isScrolled ? 0.98 : 1,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search AI tools..."
                    className="w-full px-6 py-4 rounded-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-200 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FiSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xl" />
                </div>
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
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="animate-pulse">
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center mr-3 shadow-sm">
                            <img 
                              src={getToolLogo(tool.name, 40)} 
                              alt={tool.name}
                              className="w-5/6 h-5/6 object-contain"
                              onError={(e) => {
                                // Fallback to initial letter if image fails to load
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&size=40`;
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {tool.name}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              {categoryIcons[tool.category] || categoryIcons['All']}
                              <span className="ml-1">{tool.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400" />
                          <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {tool.rating}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags?.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {tool.tags?.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium text-gray-500">
                            +{tool.tags.length - 3} more
                          </span>
                        )}
                      </div>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                      >
                        Visit Website
                        <FiExternalLink className="ml-1.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No tools found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiRefreshCw className="mr-2 -ml-1 h-4 w-4" />
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applications;
