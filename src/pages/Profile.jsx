import React from 'react';

const Profile = () => {
  // Dummy data for now; can be replaced with real user data from Firebase/Auth later
  const user = {
    name: "Kshitij Jain",
    email: "kshitij@example.com",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AIVERSE",
    stats: {
      toolsUsed: 28,
      blogsRead: 15,
      trackProgress: "Intermediate",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />

          {/* Info Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-100 text-blue-700 p-4 rounded-lg text-center shadow">
                <h3 className="text-xl font-bold">{user.stats.toolsUsed}</h3>
                <p className="text-sm">AI Tools Used</p>
              </div>
              <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center shadow">
                <h3 className="text-xl font-bold">{user.stats.blogsRead}</h3>
                <p className="text-sm">Blogs Read</p>
              </div>
              <div className="bg-purple-100 text-purple-700 p-4 rounded-lg text-center shadow">
                <h3 className="text-xl font-bold">{user.stats.trackProgress}</h3>
                <p className="text-sm">Learning Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section for Favorites (Optional) */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Tools / Bookmarked</h2>
          <p className="text-gray-600 italic">You haven't saved any tools yet. Explore & bookmark to see them here!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
