import React from 'react';
import { motion } from 'framer-motion';
import {Link} from "react-router-dom"


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <motion.h1
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to NotesPro
          </motion.h1>
          <motion.p
            className="text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            NotesPro is your ultimate solution for staying organized and productive. 
            Designed with simplicity and efficiency in mind, our platform helps you 
            create, manage, and organize your notes effortlessly. Whether it’s 
            brainstorming ideas, setting reminders, or jotting down quick thoughts, 
            NotesPro ensures everything is just a click away.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.5,
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {["Fast", "Secure", "User-Friendly"].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-purple-600 text-white rounded-lg p-4 shadow-md text-center"
                whileHover={{ scale: 1.1 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <h3 className="text-xl font-semibold">{feature}</h3>
                <p className="text-sm mt-2">
                  Experience {feature.toLowerCase()} performance to enhance your productivity.
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg">
              <Link to="/user_dashboard">Get Started</Link>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
