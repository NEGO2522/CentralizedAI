import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock, FiTag, FiSearch } from 'react-icons/fi';
import Loader from '../components/Loader';

// Sample blog post data with additional fields
const blogPosts = [
  {
    id: 1,
    title: "Top 10 AI Tools for 2025",
    date: "June 25, 2025",
    readTime: "8 min read",
    category: "AI Tools",
    description: "Discover the most trending and powerful AI tools you must try this year, including tools for writing, images, videos, and coding.",
    image: "https://source.unsplash.com/random/800x450/?ai,technology",
    link: "/blogs/top-10-ai-tools"
  },
  {
    id: 2,
    title: "How to Choose the Right AI Tool",
    date: "June 20, 2025",
    readTime: "6 min read",
    category: "Guides",
    description: "With 50+ tools in AIVERSE, here's a simple guide to pick the best one based on your goal and field.",
    image: "https://source.unsplash.com/random/800x450/?ai,computer",
    link: "/blogs/how-to-choose"
  },
  {
    id: 3,
    title: "The Future of AI in Education",
    date: "June 10, 2025",
    readTime: "10 min read",
    category: "Education",
    description: "Explore how AI is revolutionizing the education system and how students can take advantage of these changes.",
    image: "https://source.unsplash.com/random/800x450/?ai,education",
    link: "/blogs/ai-in-education"
  },
  {
    id: 4,
    title: "AI in Healthcare: 2025 Breakthroughs",
    date: "May 28, 2025",
    readTime: "12 min read",
    category: "Healthcare",
    description: "How artificial intelligence is transforming healthcare with innovative solutions and improved patient care.",
    image: "https://source.unsplash.com/random/800x450/?ai,healthcare",
    link: "/blogs/ai-healthcare"
  }
];

const BlogCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.target.src = 'https://source.unsplash.com/random/800x450/?technology';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <FiTag className="mr-1" /> {post.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center mr-4">
          <FiCalendar className="mr-1.5" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center">
          <FiClock className="mr-1.5" />
          <span>{post.readTime}</span>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.description}
      </p>
      <a
        href={post.link}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors"
      >
        Read article
        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  </motion.div>
);

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            AI Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights in the world of artificial intelligence.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 rounded-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-lg pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index % 3} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-6">
              <FiSearch className="h-10 w-10 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any articles matching your search. Try adjusting your filters or search term.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated with AI Trends
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest AI news, articles, and resources delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
