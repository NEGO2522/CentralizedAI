import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiBookOpen, FiYoutube, FiCode, FiAward, FiClock, FiX } from 'react-icons/fi';
import { FaRobot, FaBrain, FaLanguage, FaEye, FaChartLine, FaServer } from 'react-icons/fa';
import Loader from '../components/Loader';

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
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const iconMap = {
  '🤖': <FaRobot className="text-blue-400" />,
  '📊': <FaChartLine className="text-purple-400" />,
  '🧠': <FaBrain className="text-pink-400" />,
  '🗣️': <FaLanguage className="text-green-400" />,
  '👁️': <FaEye className="text-yellow-400" />,
  '🚀': <FaServer className="text-red-400" />
};

const learningTracks = [
  {
    title: "🤖 Beginner AI",
    description: "Start your journey with fundamentals: What is AI, types, real-world applications, and basic Python for AI.",
    link: "https://www.youtube.com/watch?v=JMUxmLyrhSk",
    level: "Beginner",
    duration: "2 weeks",
    resources: [
      { type: 'video', title: 'AI For Everyone - Andrew Ng', link: '#' },
      { type: 'article', title: 'AI Basics', link: '#' },
      { type: 'course', title: 'Intro to AI', link: '#' }
    ]
  },
  {
    title: "📊 Machine Learning",
    description: "Dive into ML concepts like supervised learning, classification, regression, and scikit-learn.",
    link: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
    level: "Intermediate",
    duration: "4 weeks",
    resources: [
      { type: 'video', title: 'ML Crash Course', link: '#' },
      { type: 'article', title: 'ML Algorithms', link: '#' },
      { type: 'course', title: 'Hands-on ML', link: '#' }
    ]
  },
  {
    title: "🧠 Deep Learning",
    description: "Explore neural networks, backpropagation, CNNs, RNNs, and frameworks like TensorFlow or PyTorch.",
    link: "https://www.youtube.com/watch?v=aircAruvnKk",
    level: "Advanced",
    duration: "6 weeks",
    resources: [
      { type: 'video', title: 'Neural Networks', link: '#' },
      { type: 'article', title: 'CNN Guide', link: '#' },
      { type: 'course', title: 'Deep Learning Specialization', link: '#' }
    ]
  },
  {
    title: "🗣️ Natural Language Processing (NLP)",
    description: "Learn how machines understand text: tokenization, sentiment analysis, and GPT-like models.",
    link: "https://www.youtube.com/watch?v=8uN5cGzFxzI",
    level: "Intermediate",
    duration: "5 weeks",
    resources: [
      { type: 'video', title: 'NLP Basics', link: '#' },
      { type: 'article', title: 'Transformers Guide', link: '#' },
      { type: 'course', title: 'NLP Specialization', link: '#' }
    ]
  },
  {
    title: "👁️ Computer Vision",
    description: "Teach computers to see: Image classification, object detection, OpenCV, and deep vision models.",
    link: "https://www.youtube.com/watch?v=1ci-HdeIicI",
    level: "Advanced",
    duration: "5 weeks",
    resources: [
      { type: 'video', title: 'CV Basics', link: '#' },
      { type: 'article', title: 'YOLO Guide', link: '#' },
      { type: 'course', title: 'CV Specialization', link: '#' }
    ]
  },
  {
    title: "🚀 AI in Production",
    description: "Deploy AI models, MLOps, and best practices for scaling AI applications.",
    link: "https://www.youtube.com/watch?v=1vkbVFq9Q9o",
    level: "Advanced",
    duration: "4 weeks",
    resources: [
      { type: 'video', title: 'MLOps Basics', link: '#' },
      { type: 'article', title: 'Model Deployment', link: '#' },
      { type: 'course', title: 'MLOps Specialization', link: '#' }
    ]
  }
];

const LearnAI = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTracks = learningTracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Learn AI & Machine Learning
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Master artificial intelligence with our curated learning paths. From beginner to advanced, we've got you covered.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search learning tracks..."
                  className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </motion.div>
          </div>

          {/* Learning Tracks Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredTracks.map((track, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 p-6"
                onClick={() => setSelectedTrack(track)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                      {iconMap[track.title.split(' ')[0]]}
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300">
                      {track.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{track.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center text-sm text-gray-400">
                      <FiClock className="mr-1" />
                      <span>{track.duration}</span>
                    </div>
                    <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                      View Details
                      <FiExternalLink className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Track Detail Modal */}
      <AnimatePresence>
          {selectedTrack && (
            <motion.div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrack(null)}
            >
              <motion.div 
                className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedTrack.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <FiAward className="mr-1" /> {selectedTrack.level}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="mr-1" /> {selectedTrack.duration}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedTrack(null)}
                      className="text-gray-400 hover:text-white p-1 -mr-2"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{selectedTrack.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <FiBookOpen className="mr-2 text-blue-400" />
                      Learning Resources
                    </h3>
                    <div className="space-y-3">
                      {selectedTrack.resources.map((resource, i) => (
                        <a
                          key={i}
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors group"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                              {resource.type === 'video' ? (
                                <FiYoutube className="w-4 h-4" />
                              ) : resource.type === 'article' ? (
                                <FiBookOpen className="w-4 h-4" />
                              ) : (
                                <FiCode className="w-4 h-4" />
                              )}
                            </div>
                            <span className="font-medium group-hover:text-blue-300 transition-colors">
                              {resource.title}
                            </span>
                            <FiExternalLink className="ml-auto text-gray-400 group-hover:text-blue-300 transition-colors" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href={selectedTrack.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Start Learning
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default LearnAI;
