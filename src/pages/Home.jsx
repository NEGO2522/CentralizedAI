import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiClock, FiAward } from 'react-icons/fi';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
      });
    }
    
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (loading) return <Loader />;

  const features = [
    {
      icon: <FiSearch className="h-6 w-6 text-blue-400" />,
      title: "Discover AI Tools",
      description: "Explore our curated collection of the latest and most powerful AI applications."
    },
    {
      icon: <FiClock className="h-6 w-6 text-purple-400" />,
      title: "Save Time",
      description: "Quickly find the perfect AI solution for your specific needs."
    },
    {
      icon: <FiAward className="h-6 w-6 text-green-400" />,
      title: "Expert Vetted",
      description: "All tools are carefully reviewed and tested by our team of experts."
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Browse',
      description: 'Explore our extensive collection of AI tools and resources.'
    },
    {
      number: '02',
      title: 'Learn',
      description: 'Access tutorials and guides to master AI technologies.'
    },
    {
      number: '03',
      title: 'Build',
      description: 'Create amazing projects with the power of artificial intelligence.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-gray-900/30">
          <ParticleBackground />
          <motion.div 
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 filter blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover the Future of
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
                AI-Powered Tools
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explore our curated collection of cutting-edge AI applications and resources to enhance your productivity and creativity.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/applications"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center space-x-2"
              >
                <span>Explore AI Tools</span>
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/learnai"
                className="bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700 text-white font-medium rounded-full px-8 py-3 text-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Learn AI</span>
              </Link>
            </motion.div>
            
            {/* Features Grid */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get started in just a few simple steps</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Join thousands of developers and businesses already using our platform
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Create Free Account</span>
                  <FiArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      {user && (
        <>
          <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Exploring AI Tools</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  Discover our curated collection of AI applications to boost your productivity
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/applications"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center space-x-2"
                  >
                    <span>Explore AI Tools</span>
                    <FiArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* AI Tools Section */}
          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular AI Tools</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Explore some of the most powerful AI tools available today
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* ChatGPT Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-2 rounded-lg mr-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">ChatGPT</h3>
                    </div>
                    <p className="text-gray-400 mb-4">Advanced AI language model by OpenAI that can understand and generate human-like text.</p>
                    <a 
                      href="https://chat.openai.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Visit ChatGPT
                      <FiArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>

                {/* Cursor Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-black p-2 rounded-lg mr-4">
                        <img src="https://www.cursor.com/favicon.ico" alt="Cursor" className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Cursor</h3>
                    </div>
                    <p className="text-gray-400 mb-4">The AI-first code editor that helps you write better code, faster, with AI assistance.</p>
                    <a 
                      href="https://www.cursor.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
                    >
                      Explore Cursor
                      <FiArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>

                {/* Windsurf Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-2 rounded-lg mr-4">
                        <img src="https://www.windsurf.com/favicon.ico" alt="Windsurf" className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Windsurf</h3>
                    </div>
                    <p className="text-gray-400 mb-4">Powerful AI platform for building and deploying machine learning models at scale.</p>
                    <a 
                      href="https://www.windsurf.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-400 hover:text-green-300 font-medium"
                    >
                      Discover Windsurf
                      <FiArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>

                {/* Groq Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-black p-2 rounded-lg mr-4">
                        <img src="https://groq.com/favicon.ico" alt="Groq" className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Groq</h3>
                    </div>
                    <p className="text-gray-400 mb-4">AI acceleration platform that delivers unprecedented performance for machine learning workloads.</p>
                    <a 
                      href="https://groq.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-400 hover:text-red-300 font-medium"
                    >
                      Check out Groq
                      <FiArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>

                {/* Midjourney Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-black p-2 rounded-lg mr-4 flex items-center justify-center w-12 h-12">
                        <div className="text-green-400 font-bold text-2xl">MJ</div>
                      </div>
                      <h3 className="text-xl font-semibold text-white">Midjourney</h3>
                    </div>
                    <p className="text-gray-400 mb-4">AI-powered image generation tool that creates stunning visuals from text descriptions.</p>
                    <a 
                      href="https://www.midjourney.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium"
                    >
                      Try Midjourney
                      <FiArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>

                {/* Claude Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-2 rounded-lg mr-4">
                        <img src="https://www.anthropic.com/favicon.ico" alt="Claude" className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Claude</h3>
                    </div>
                    <p className="text-gray-400 mb-4">AI assistant focused on being helpful, harmless, and honest in conversations.</p>
                    <a 
                      href="https://www.anthropic.com/claude" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium"
                    >
                      Meet Claude
                      <FiArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
