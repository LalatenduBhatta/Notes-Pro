import React, { useState } from "react";
import book from "../../../images/book.png";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import {motion} from 'framer-motion'
import {Link}  from "react-router-dom"

const Dashboard = () => {
  const [text] = useTypewriter({
    words: ["Where brilliance meets precision and ideas come to life!"],
    loop: {},
  });

  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (
    <motion.main 
    initial={{opacity:0 , scale:0}}
    whileInView={{opacity:1,scale:1}}
    transition={{duration:2}}
    className="w-screen h-auto flex flex-col bg-gradient-to-br from-purple-100 via-blue-100 to-pink-200 mt-20">
      
      {/* Top Section */}
      <div className="w-full h-[70vh] flex">
        <div className="w-[60%] h-full flex flex-col items-center justify-center p-10 animate-fade-in">
          <h1 className="text-5xl font-bold text-blue-800 italic mb-4">
            Welcome to <span className="text-pink-600">Quick Note</span>!
          </h1>
          <p className="text-2xl text-gray-700 text-center mb-6">
            A platform designed to organize your ideas effortlessly.
          </p>
          <span className="text-xl text-gray-600 font-medium">
            {text}
            <Cursor />
          </span>
          <div className="mt-10 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
              <Link to="/login">Get Started</Link>
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg shadow-lg hover:bg-blue-100 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[40%] h-full flex items-center justify-center relative animate-slide-in-right ">
          <img
            src={book}
            alt="Book Illustration"
            className="w-[70%] h-[65%] drop-shadow-xl "
          />
        </div>
      </div>

      {/* Learn More Section */}
      {showMore && (
        <div className="w-full bg-white py-12 px-8 shadow-lg rounded-lg animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Why Choose Quick Note?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-pink-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Effortless Organization
              </h3>
              <p className="text-gray-700">
                Quickly jot down ideas and manage tasks with our intuitive and
                user-friendly platform.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Seamless Access
              </h3>
              <p className="text-gray-700">
                Access your notes anytime, anywhere with cross-device
                synchronization.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">
                Secure and Private
              </h3>
              <p className="text-gray-700">
                Your notes are stored securely, ensuring complete privacy and
                protection.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
            >
              Show Less
            </button>
          </div>
        </div>
      )}
    </motion.main>
  );
};

export default Dashboard;
