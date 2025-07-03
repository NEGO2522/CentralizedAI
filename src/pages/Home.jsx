import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth'

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
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
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
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
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    />
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    
    // Check auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Main Content Area */}
      <div className="flex-grow relative overflow-visible">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 animate-gradient-xy rounded-b-[150px] overflow-hidden">
            {/* Navigation */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-50">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-white text-2xl font-bold">AIVERSE</div>
                
                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-8">
                    <Link to="/applications" className="text-white hover:text-gray-200 hover:underline cursor-pointer text-sm font-medium transition-colors">AI Tools</Link>
                    <a href="#" className="text-white hover:text-gray-200 hover:underline cursor-pointer text-sm font-medium transition-colors">AI for Business</a>
                    <Link to="/blog" className="text-white hover:text-gray-200 hover:underline cursor-pointer text-sm font-medium transition-colors">Newsletter</Link>
                    <Link to="/learnai" className="text-white hover:text-gray-200 hover:underline cursor-pointer text-sm font-medium transition-colors">Resources</Link>
                  </div>
                </div>
                
                {/* Right side actions */}
                <div className="hidden md:flex items-center space-x-4">
                  <button className="text-white hover:text-gray-200 hover:underline cursor-pointer p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  
                  {isLoggedIn ? (
                    <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
                      {auth.currentUser?.photoURL ? (
                        <img 
                          src={auth.currentUser.photoURL} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${auth.currentUser?.displayName || 'User'}&background=7C3AED&color=fff`;
                          }}
                        />
                      ) : (
                        <span className="text-white font-medium text-lg">
                          {auth.currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="text-white hover:text-gray-200 hover:underline cursor-pointer text-sm font-medium transition-colors">Login</Link>
                      <Link to="/login" className="bg-white text-blue-600 hover:bg-gray-100 hover:underline cursor-pointer px-3 py-1.5 rounded-4xl text-sm font-medium transition-colors">
                        Sign up for free
                      </Link>
                    </>
                  )}
                </div>
                
                {/* Mobile menu button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white focus:outline-none md:hidden z-50"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Mobile Menu */}
              <div 
                className={`md:hidden absolute left-0 right-0 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 px-4 pb-4 space-y-3 border-t border-white/20 transition-all duration-300 transform origin-top ${
                  isMenuOpen 
                    ? 'opacity-100 scale-y-100 max-h-screen mt-4' 
                    : 'opacity-0 scale-y-95 max-h-0 pointer-events-none -mt-4'
                }`}
              >
                <Link to="/applications" className="block text-white hover:text-gray-200 hover:underline cursor-pointer py-2 text-base font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>AI Tools</Link>
                <a href="#" className="block text-white hover:text-gray-200 hover:underline cursor-pointer py-2 text-base font-medium transition-colors">AI for Business</a>
                <Link to="/blog" className="block text-white hover:text-gray-200 hover:underline cursor-pointer py-2 text-base font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Newsletter</Link>
                <Link to="/learnai" className="block text-white hover:text-gray-200 hover:underline cursor-pointer py-2 text-base font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                <div className="pt-2 mt-2 border-t border-white/20">
                  {isLoggedIn ? (
                    <Link 
                      to="/profile" 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {auth.currentUser?.photoURL ? (
                        <img 
                          src={auth.currentUser.photoURL} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${auth.currentUser?.displayName || 'User'}&background=7C3AED&color=fff`;
                          }}
                        />
                      ) : (
                        <span className="text-white font-medium text-lg">
                          {auth.currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="block text-white hover:text-gray-200 hover:underline cursor-pointer py-2 text-base font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      <Link to="/login" className="inline-block bg-white text-blue-600 hover:bg-gray-100 hover:underline cursor-pointer px-4 py-2 rounded-4xl text-base font-medium transition-colors mt-2">
                        Sign up for free
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Gradient Blobs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-400/20 filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-400/20 filter blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 2
            }}
          />
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjIiPgogICAgICA8cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzB2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNHYtNEg0djRIMHYyaDR2NEg2VjR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K')]"></div>
          </div>
          
          <ParticleBackground />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-semibold mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Everything your business needs to master AI, all in one place.
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore top AI tools and learn how to use them effectively.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/get-started"
                className="inline-block bg-white  hover:bg-gray-100 font-medium rounded-4xl px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join For Free
              </Link>
            </motion.div>

            {/* Trusted By Section */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-sm text-white/70 mb-6 tracking-wider">TRUSTED BY</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                {[
                  { 
                    name: 'ChatGPT',
                    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                    color: 'text-green-500'
                  },
                  { 
                    name: 'Perplexity',
                    icon: 'M12 2L4 7v10l8 5 8-5V7l-8-5z',
                    color: 'text-blue-500'
                  },
                  { 
                    name: 'Groq',
                    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
                    color: 'text-purple-500'
                  },
                  { 
                    name: 'Grammarly',
                    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
                    color: 'text-blue-400'
                  }
                ].map((company, index) => (
                  <div key={index} className="flex items-center space-x-2 group transform transition-transform hover:scale-105">
                    <div className={`h-8 w-8 flex items-center justify-center ${company.color}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d={company.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white group-hover:opacity-100 opacity-90 transition-opacity">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* White Bottom Section */}
      <div className="bg-white w-full py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of businesses already using our platform to master AI.
          </p>
          <Link
            to="/get-started"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-lg transition-colors duration-200"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
