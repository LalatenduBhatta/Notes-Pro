import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'react-canvas-confetti';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../../../helpers/API';

const Login = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState({
    email: '',
    password: '',
  });

  const launchConfetti = () => {
    const duration = 15 * 1000;
    const end = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseURL}/login`, inp);
      const { message, token, username } = data;

      if (message === 'login Successfull') {
        toast.success('Login Successful');
        localStorage.setItem('access-token', token);
        localStorage.setItem('username', username);
        navigate('/user_dashboard');
        launchConfetti();
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      toast.error('Login Failed');
    }
  };

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center animate-fade-in">
        <img
          src="https://miro.medium.com/v2/resize:fit:1200/1*L_uYdGu27oUO4hbf1SE9dw.gif"
          alt="Login Illustration"
          className="w-3/4 h-auto drop-shadow-lg animate-bounce rounded-full"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-4/5 max-w-lg p-10 bg-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Welcome Back!</h1>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={inp.email}
                onChange={handleInput}
                placeholder="  "
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none peer"
              />
              <label
                className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email Address
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={inp.password}
                onChange={handleInput}
                placeholder=" "
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none peer"
              />
              <label
                className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Password
              </label>
            </div>
            <div className="text-right">
              <Link
                to="/reset"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
