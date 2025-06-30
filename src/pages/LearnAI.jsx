import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader'; // ✅ update path as per your folder structure

const learningTracks = [
  {
    title: "🤖 Beginner AI",
    description: "Start your journey with fundamentals: What is AI, types, real-world applications, and basic Python for AI.",
    link: "https://www.youtube.com/watch?v=JMUxmLyrhSk",
  },
  {
    title: "📊 Machine Learning",
    description: "Dive into ML concepts like supervised learning, classification, regression, and scikit-learn.",
    link: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
  },
  {
    title: "🧠 Deep Learning",
    description: "Explore neural networks, backpropagation, CNNs, RNNs, and frameworks like TensorFlow or PyTorch.",
    link: "https://www.youtube.com/watch?v=aircAruvnKk",
  },
  {
    title: "🗣️ Natural Language Processing (NLP)",
    description: "Learn how machines understand text: tokenization, sentiment analysis, and GPT-like models.",
    link: "https://www.youtube.com/watch?v=8uN5cGzFxzI",
  },
  {
    title: "👁️ Computer Vision",
    description: "Teach computers to see: Image classification, object detection, OpenCV, and deep vision models.",
    link: "https://www.youtube.com/watch?v=1ci-HdeIicI",
  },
  {
    title: "🧑‍💻 Build AI Projects",
    description: "Start building real projects: AI chatbots, image generators, and recommendation engines.",
    link: "https://www.youtube.com/watch?v=V_gn0sjEUPs",
  },
];

const LearnAI = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading for 1.5s
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Learn AI with AIVERSE</h1>
        <p className="text-gray-600 text-lg mb-12">
          Step-by-step curated learning tracks to become an AI master — from basics to building full projects.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningTracks.map((track, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{track.title}</h3>
              <p className="text-gray-600 mb-4">{track.description}</p>
              <a
                href={track.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Start Learning →
              </a>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-12">
          Want custom tutorials or help with a specific topic? <a href="/contact" className="text-blue-500 underline">Contact us</a>
        </p>
      </div>
    </div>
  );
};

export default LearnAI;
