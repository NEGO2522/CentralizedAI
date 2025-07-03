import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle, sendSignInLink, isSignInLink, signInWithEmailLinkHandler } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope, FaArrowRight, FaUser, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    if (isSignInLink()) {
      handleEmailLinkSignIn();
    }

    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLinkSignIn = async () => {
    setIsLoading(true);
    const email = window.localStorage.getItem('emailForSignIn');
    
    if (!email) {
      setMessage({
        text: 'Please enter your email to complete sign in',
        type: 'info'
      });
      setIsLoading(false);
      return;
    }

    const { success, error } = await signInWithEmailLinkHandler(email);
    
    if (success) {
      setMessage({
        text: 'Successfully signed in!',
        type: 'success'
      });
      navigate('/');
    } else {
      setMessage({
        text: error || 'Failed to sign in with email link',
        type: 'error'
      });
    }
    setIsLoading(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({
        text: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    const { success, error } = await sendSignInLink(email);
    
    if (success) {
      setIsEmailSent(true);
      setMessage({
        text: `Sign-in link sent to ${email}. Please check your email.`,
        type: 'success'
      });
    } else {
      setMessage({
        text: error || 'Failed to send sign-in link. Please try again.',
        type: 'error'
      });
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { success, error } = await signInWithGoogle();
    
    if (!success) {
      setMessage({
        text: error || 'Failed to sign in with Google',
        type: 'error'
      });
    }
    setIsLoading(false);
  };

  const getMessageStyles = (type) => {
    const baseStyles = 'p-4 rounded-lg mb-6 text-sm flex items-start';
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 text-green-700 border border-green-200`;
      case 'error':
        return `${baseStyles} bg-red-50 text-red-700 border border-red-200`;
      case 'info':
        return `${baseStyles} bg-blue-50 text-blue-700 border border-blue-200`;
      default:
        return baseStyles;
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck className="mt-0.5 mr-2 flex-shrink-0" />;
      case 'error':
        return <FaInfoCircle className="mt-0.5 mr-2 flex-shrink-0" />;
      case 'info':
        return <FaInfoCircle className="mt-0.5 mr-2 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4"
            >
              <FaUser className="text-white text-2xl" />
            </motion.div>
            <motion.h1 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-blue-100 text-sm"
            >
              {isEmailSent ? 'Check your email to continue' : 'Sign in to access your account'}
            </motion.p>
          </div>

          {/* Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={getMessageStyles(message.type)}
                >
                  {getMessageIcon(message.type)}
                  <span>{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {!isEmailSent ? (
              <>
                <form onSubmit={handleEmailSubmit} className="mb-6">
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition duration-200"
                      />
                    </div>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Link...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        Continue with Email
                        <FaArrowRight className="ml-2 text-sm opacity-70" />
                      </span>
                    )}
                  </motion.button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-400">Or continue with</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FcGoogle className="text-lg mr-2" />
                      Continue with Google
                    </span>
                  )}
                </motion.button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                <p className="text-gray-600 mb-6">We've sent a magic link to <span className="font-medium">{email}</span></p>
                <button
                  onClick={() => {
                    setEmail('');
                    setMessage({ text: '', type: '' });
                    setIsEmailSent(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Back to login
                </button>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500">
              By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;