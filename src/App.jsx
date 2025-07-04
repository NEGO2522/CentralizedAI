import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { auth } from './Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Applications from './pages/Applications';
import LearnAI from './pages/LearnAI';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';

// List of protected routes that require authentication
const protectedRoutes = ['/applications', '/learnai', '/blog', '/about', '/contact'];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state on route change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname.startsWith(route)
      );
      
      if (isProtectedRoute && !user) {
        navigate('/login', { state: { from: location.pathname } });
      }
    });

    return () => unsubscribe();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Protected Routes */}
            <Route path="/applications" element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            } />
            
            <Route path="/learnai" element={
              <ProtectedRoute>
                <LearnAI />
              </ProtectedRoute>
            } />
            
            <Route path="/blog" element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            } />
            
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            
            <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
