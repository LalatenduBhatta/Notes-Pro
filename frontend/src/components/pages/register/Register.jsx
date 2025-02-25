import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../helpers/API';

const InputField = ({ label, name, type, value, onChange, required }) => (
  <div className="relative mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      required={required}
      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none peer transform transition-all ease-in-out duration-200 hover:scale-105"
    />
    <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
      {label}
    </label>
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState({
    username: '',
    email: '',
    number: '',
    age: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { username, email, number, age, password } = inp;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseURL}/register`, inp);
      if (data.message === 'User register successfully') {
        toast.success('Registration Successful');
        navigate('/login');
      } else {
        toast.error(data.message || 'Already have an account');
      }
    } catch (error) {
      toast.error('Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-200 to-pink-300 overflow-hidden">
      <div className="w-full max-w-3xl flex shadow-lg rounded-lg bg-white overflow-hidden animate-slide-up">
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-tl from-pink-500 via-red-400 to-yellow-500 rounded-2xl">
          <img src="https://thumbs.dreamstime.com/b/handwritten-text-caption-showing-register-now-business-concept-writing-registration-written-sticky-note-paper-w-110895922.jpg" alt="Register Illustration" className="w-[90%] h-[530px] rounded-3xl" />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center text-yellow-800 mb-8 animate-fade-in-up">Sign Up</h1>
          <form onSubmit={handleForm} className="space-y-6 animate-fade-in-up">
            <InputField label="Name" name="username" type="text" value={username} onChange={handleInput} required />
            <InputField label="Email" name="email" type="email" value={email} onChange={handleInput} required />
            <InputField label="Phone Number" name="number" type="number" value={number} onChange={handleInput} required />
            <InputField label="Age" name="age" type="number" value={age} onChange={handleInput} required />
            <InputField label="Password" name="password" type="password" value={password} onChange={handleInput} required />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-110 font-semibold animate-bounce"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
