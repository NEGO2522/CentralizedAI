import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">About AIVERSE</h1>

        <p className="text-gray-700 text-lg mb-6 text-center">
          Welcome to <strong>AIVERSE</strong> — your central hub for exploring, discovering, and understanding AI-powered tools.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🚀 Our Mission</h2>
            <p className="text-gray-600">
              We aim to empower students, developers, creators, and businesses by connecting them with the best AI tools available today — across design, development, productivity, content, education, and more.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🧠 What We Offer</h2>
            <p className="text-gray-600">
              AIVERSE curates and categorizes 50+ high-quality AI tools — from ChatGPT alternatives and text-to-image models to coding assistants, voice changers, and video creators — so you can quickly find what suits your needs.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🌐 Why AIVERSE?</h2>
            <p className="text-gray-600">
              The AI world is exploding with innovation, but it's easy to get lost. AIVERSE simplifies the chaos by giving you a powerful search system, organized categories, and honest summaries of tools — so you stay ahead of the curve.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🔍 What's Next</h2>
            <p className="text-gray-600">
              We’re planning to expand to 100+ tools, build AI tutorials, user reviews, and even AI comparison features. Stay tuned — this is just the beginning.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-700">
            Built with ❤️ by curious minds who believe AI should be accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
