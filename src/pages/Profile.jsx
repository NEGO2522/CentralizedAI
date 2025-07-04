import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../Firebase/firebase';
import { signOut, updateProfile, updateEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiUpload, FiLogOut, FiSave, FiX, FiUser, FiMail, FiAward, FiBookmark, FiTool } from 'react-icons/fi';
import { toast } from 'react-hot-toast';


const Profile = () => {
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=AIVERSE',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [savedTools, setSavedTools] = useState([
    { id: 1, name: 'AI Image Generator', category: 'Design', savedOn: '2023-06-15' },
    { id: 2, name: 'Code Assistant', category: 'Development', savedOn: '2023-06-20' },
  ]);
  const [activity, setActivity] = useState([
    { id: 1, action: 'Logged in', time: '2 hours ago', icon: '🔑' },
    { id: 2, action: 'Used AI Image Generator', time: '5 hours ago', icon: '🎨' },
    { id: 3, action: 'Saved Code Assistant', time: '1 day ago', icon: '💾' },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        displayName: currentUser.displayName || 'User',
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=AIVERSE',
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    try {
      const fileRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await uploadBytes(fileRef, selectedFile);
      const photoURL = await getDownloadURL(fileRef);
      
      await updateProfile(auth.currentUser, { photoURL });
      setUser(prev => ({ ...prev, photoURL }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: user.displayName,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="relative">
            <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className="px-6 md:px-8 -mt-16 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex items-end gap-6
                ">
                  <div className="relative group">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-2xl object-cover bg-gray-200"
                    />
                    <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <FiUpload className="h-5 w-5 text-gray-800" />
                    </label>
                  </div>
                  
                  <div className="mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{user.displayName}</h1>
                    <p className="text-gray-300 flex items-center gap-2">
                      <FiMail className="h-4 w-4" />
                      {user.email}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-300">
                      <FiAward className="h-4 w-4" />
                      <span>AI Enthusiast</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    {isEditing ? <FiX className="h-4 w-4" /> : <FiEdit2 className="h-4 w-4" />}
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Card */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">AI Tools Used</p>
                    <p className="text-2xl font-bold text-blue-400">28</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Blogs Read</p>
                    <p className="text-2xl font-bold text-purple-400">15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Learning Level</p>
                    <p className="text-2xl font-bold text-green-400">Intermediate</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <nav className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === 'overview' 
                        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <FiUser className="h-5 w-5" />
                    <span>Profile Overview</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('saved')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === 'saved' 
                        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <FiBookmark className="h-5 w-5" />
                    <span>Saved Tools</span>
                    <span className="ml-auto bg-gray-700 text-xs text-white px-2 py-1 rounded-full">
                      {savedTools.length}
                    </span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('activity')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === 'activity' 
                        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <FiTool className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {isEditing ? (
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <h2 className="text-xl font-semibold text-white mb-6">Edit Profile</h2>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={user.displayName}
                          onChange={(e) => setUser({...user, displayName: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <FiSave className="h-4 w-4" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 min-h-[400px]"
                  >
                    {activeTab === 'overview' && (
                      <div>
                        <h2 className="text-xl font-semibold text-white mb-6">Profile Overview</h2>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">ABOUT</h3>
                            <p className="text-gray-300">
                              AI enthusiast exploring the latest in machine learning and artificial intelligence. 
                              Passionate about leveraging AI to solve real-world problems.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">ACCOUNT CREATED</h3>
                            <p className="text-gray-300">
                              {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'saved' && (
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-white">Saved Tools</h2>
                          <span className="text-sm text-gray-400">{savedTools.length} items</span>
                        </div>
                        
                        {savedTools.length > 0 ? (
                          <div className="space-y-4">
                            {savedTools.map((tool) => (
                              <div key={tool.id} className="p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-medium text-white">{tool.name}</h3>
                                    <p className="text-sm text-gray-400">{tool.category}</p>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Saved on {tool.savedOn}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FiBookmark className="h-12 w-12 text-gray-500 mb-4" />
                            <h3 className="text-lg font-medium text-gray-300">No saved tools yet</h3>
                            <p className="text-gray-500 mt-1 max-w-md">
                              Save your favorite AI tools and they'll appear here for quick access.
                            </p>
                            <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                              Explore Tools
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'activity' && (
                      <div>
                        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                        <div className="space-y-6">
                          {activity.map((item) => (
                            <div key={item.id} className="flex items-start gap-4">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-gray-300">{item.action}</p>
                                <p className="text-sm text-gray-500">{item.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
