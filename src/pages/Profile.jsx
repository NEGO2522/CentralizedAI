import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../Firebase/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';


const Profile = () => {
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=AIVERSE',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Profile</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="text-white text-sm font-medium">
                    {loading ? 'Uploading...' : 'Change Photo'}
                  </span>
                </label>
              </div>

              {/* User Info */}
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={user.displayName}
                        onChange={(e) => setUser({...user, displayName: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Email</label>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex space-x-4 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">{user.displayName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow">
                <h3 className="text-2xl font-bold text-blue-600">28</h3>
                <p className="text-gray-600">AI Tools Used</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow">
                <h3 className="text-2xl font-bold text-purple-600">15</h3>
                <p className="text-gray-600">Blogs Read</p>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl shadow">
                <h3 className="text-2xl font-bold text-indigo-600">Intermediate</h3>
                <p className="text-gray-600">Learning Level</p>
              </div>
            </div>

            {/* Saved Items */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Tools</h2>
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <p className="text-gray-500 italic">You haven't saved any tools yet. Explore & save your favorites!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
