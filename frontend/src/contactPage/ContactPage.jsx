import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa'; // For social media icons

const ContactPage = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Replace with your Web3Forms Access Key
    formData.append("access_key", "69a3d0f0-6e0b-46d1-8ade-aa88506555ef");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const res = await response.json();

    if (res.success) {
      alert("Your message has been sent successfully!");
      event.target.reset(); // Reset the form
    } else {
      alert("There was an issue sending your message. Please try again later.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-xl bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden mt-16"
      >
        <div className="p-6">
          <motion.h1
            className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-base leading-relaxed mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Have questions, feedback, or need assistance? We’d love to hear from you! 
            Fill out the form below, and we’ll get back to you as soon as possible.
          </motion.p>
          <form className="space-y-4" onSubmit={onSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <label className="block text-sm font-bold mb-1" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <label className="block text-sm font-bold mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <label className="block text-sm font-bold mb-1" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full px-3 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500"
                placeholder="Write your message here"
                rows="4"
                required
              ></textarea>
            </motion.div>
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-teal-600 hover:to-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:shadow-xl transition-transform duration-500"
              >
                Send Message
              </button>
            </motion.div>
          </form>

          {/* Social Media Links Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-lg mb-4">Follow us on social media:</p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500 transition-all duration-300 transform hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-500 transition-all duration-300 transform hover:scale-110" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-2xl hover:text-gray-700 transition-all duration-300 transform hover:scale-110" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-700 transition-all duration-300 transform hover:scale-110" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
