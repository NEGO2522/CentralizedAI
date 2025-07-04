import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const pulse = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div 
        className="flex flex-col items-center space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Animated Logo */}
        <motion.div 
          className="relative"
          variants={item}
        >
          <motion.div 
            className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1"
            animate={pulse}
          >
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AI
              </span>
            </div>
          </motion.div>
          
          {/* Orbiting dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-blue-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                x: -8, // Half of width
                y: -8, // Half of height
              }}
              animate={{
                x: [
                  Math.cos((i * 120 * Math.PI) / 180) * 35 - 8,
                  Math.cos(((i * 120) + 120 * Math.PI) / 180) * 35 - 8,
                  Math.cos(((i * 120) + 240 * Math.PI) / 180) * 35 - 8,
                  Math.cos((i * 120 * Math.PI) / 180) * 35 - 8,
                ],
                y: [
                  Math.sin((i * 120 * Math.PI) / 180) * 35 - 8,
                  Math.sin(((i * 120) + 120 * Math.PI) / 180) * 35 - 8,
                  Math.sin(((i * 120) + 240 * Math.PI) / 180) * 35 - 8,
                  Math.sin((i * 120 * Math.PI) / 180) * 35 - 8,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.33, 0.66, 1],
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div variants={item} className="text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2"
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            AIVERSE
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-sm md:text-base"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            Loading your experience...
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden mt-4"
          variants={item}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
