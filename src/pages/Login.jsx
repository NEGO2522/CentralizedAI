import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    const baseStyles = 'p-4 rounded-xl text-sm flex items-start border';
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500/10 text-green-300 border-green-500/20`;
      case 'error':
        return `${baseStyles} bg-red-500/10 text-red-300 border-red-500/20`;
      case 'info':
        return `${baseStyles} bg-blue-500/10 text-blue-300 border-blue-500/20`;
      default:
        return `${baseStyles} bg-gray-800/50 text-gray-300 border-gray-700`;
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

  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4"
            >
              <FaUser className="text-white text-2xl" />
            </motion.div>
            <motion.h1 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-sm"
            >
              {isEmailSent ? 'Check your email to continue' : 'Sign in to access your dashboard'}
            </motion.p>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
            <AnimatePresence mode="wait">
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className={`${getMessageStyles(message.type)} backdrop-blur-sm`}
                >
                  {getMessageIcon(message.type)}
                  <span className="text-sm">{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {!isEmailSent ? (
              <>
                <form onSubmit={handleEmailSubmit} className="mb-6">
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={isLoading}
                        className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-500/20"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaEnvelope className="mr-2" />
                        Send Magic Link
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 py-3.5 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FcGoogle className="h-5 w-5" />
                  {isLoading ? 'Signing in...' : 'Continue with Google'}
                </motion.button>

                <p className="mt-8 text-center text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Sign up
                  </Link>
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-green-500/10 mb-6 text-green-400"
                >
                  <FaCheck className="h-8 w-8" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-semibold text-white mb-2"
                >
                  Check your email
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-400 mb-6"
                >
                  We've sent a magic link to <span className="font-medium text-white">{email}</span>.
                  Click the link to sign in.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  type="button"
                  onClick={() => {
                    setEmail('');
                    setIsEmailSent(false);
                    setMessage({ text: '', type: '' });
                  }}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 focus:outline-none transition-colors"
                >
                  Back to sign in
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;