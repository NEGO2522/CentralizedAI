import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader'; // ✅ Adjust path if needed

// Sample blog post data
const blogPosts = [
  {
    title: "Top 10 AI Tools for 2025",
    date: "June 25, 2025",
    description: "Discover the most trending and powerful AI tools you must try this year, including tools for writing, images, videos, and coding.",
    link: "/blogs/top-10-ai-tools"
  },
  {
    title: "How to Choose the Right AI Tool",
    date: "June 20, 2025",
    description: "With 50+ tools in AIVERSE, here's a simple guide to pick the best one based on your goal and field.",
    link: "/blogs/how-to-choose"
  },
  {
    title: "The Future of AI in Education",
    date: "June 10, 2025",
    description: "Explore how AI is revolutionizing the education system and how students can take advantage of these changes.",
    link: "/blogs/ai-in-education"
  }
];

const Blog = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate 1.5s loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">AI Blog & Insights</h1>
        <p className="text-center text-gray-600 mb-10">
          Read our latest thoughts, tips, updates, and deep-dives into the AI world.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <a
                href={post.link}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
