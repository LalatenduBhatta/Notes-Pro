import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const username = localStorage.getItem('username');
  const firstLetter = username?.split(' ').map((e) => e[0]).join('').toUpperCase();
  const user = localStorage.getItem('access-token');

  return (
    <nav className="fixed top-0 left-0 w-full  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
      {/* Top Navbar Container */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center  ">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group ">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full border-2 border-black group-hover:animate-spin "
          />
          <span className="text-3xl font-bold text-white tracking-widest group-hover:text-gray-100 transition duration-300">
          NotesPro

          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg text-white font-medium">
          <li className="group">
            <Link
              to="/"
              className="relative group-hover:text-yellow-300 transition duration-300"
            >
              Home
              <div className="absolute w-0 h-1 bg-yellow-300 left-0 bottom-0 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/AboutPage"
              className="relative group-hover:text-yellow-300 transition duration-300"
            >
              About
              <div className="absolute w-0 h-1 bg-yellow-300 left-0 bottom-0 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/contactpage"
              className="relative group-hover:text-yellow-300 transition duration-300"
            >
              Contact
              <div className="absolute w-0 h-1 bg-yellow-300 left-0 bottom-0 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </li>
        </ul>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div
                className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-xl font-bold text-white hover:shadow-lg transition transform hover:scale-110"
                title={username}
              >
                {firstLetter}
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 rounded-full text-white hover:bg-red-700 shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => {
            const menu = document.querySelector('.mobile-menu');
            menu.classList.toggle('hidden');
          }}
        >
          <span className="block w-8 h-1 bg-white my-1 rounded-sm"></span>
          <span className="block w-8 h-1 bg-white my-1 rounded-sm"></span>
          <span className="block w-8 h-1 bg-white my-1 rounded-sm"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden bg-gradient-to-br from-purple-500 to-red-500 text-white">
        <ul className="text-center space-y-4 py-4">
          <li>
            <Link
              to="/"
              className="block py-2 hover:bg-purple-700 transition-all"
              onClick={() => closeMenu()}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/AboutPage"
              className="block py-2 hover:bg-purple-700 transition-all"
              onClick={() => closeMenu()}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 hover:bg-purple-700 transition-all"
              onClick={() => closeMenu()}
            >
              Contact
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={logout}
                className="block w-full text-left py-2 hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="block py-2 hover:bg-green-600 transition-all"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );

  function closeMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.add('hidden');
  }
};

export default Navbar;
