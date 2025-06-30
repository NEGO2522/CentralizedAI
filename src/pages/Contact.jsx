import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Contact Us</h1>

        <p className="text-center mb-6 text-gray-600">
          Got a suggestion, question, or want to collaborate? Fill out the form and we’ll get back to you.
        </p>

        <form className="grid gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          >
            Send Message
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Or reach us directly at <a href="mailto:aiverse@example.com" className="text-blue-500 underline">aiverse@example.com</a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
