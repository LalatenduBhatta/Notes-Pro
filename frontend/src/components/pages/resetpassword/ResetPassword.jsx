import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import baseURL from '../../../helpers/API';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [inp, setInp] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    });

    const { email, password, confirmpassword } = inp;

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInp({ ...inp, [name]: value });
    };

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`${baseURL}/reset`, inp);
            console.log(data);
            toast.success("Password Reset Successfully", { position: "top-right" });
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.", { position: "top-right" });
        }
    };

    return (
        <div className='w-screen h-[100vh] flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500'>
            <motion.div
                className='w-[35%] h-[60%] flex items-center justify-center flex-col shadow-2xl shadow-black bg-white rounded-lg'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className='w-full h-[25%] flex items-center justify-center'
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className='text-3xl font-mono font-semibold text-blue-800'>Reset Your Password</h1>
                </motion.div>

                <form
                    className='w-full h-[75%] flex items-center justify-center flex-col'
                    onSubmit={handleForm}
                >
                    <motion.input
                        type="email"
                        placeholder='Email'
                        className='w-[75%] px-4 py-2 rounded-[7px] border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='email'
                        value={email}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <br />
                    <motion.input
                        type="password"
                        placeholder='Password'
                        className='w-[75%] px-4 py-2 rounded-[7px] border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='password'
                        value={password}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    <br />
                    <motion.input
                        type="password"
                        placeholder='Confirm Password'
                        className='w-[75%] px-4 py-2 rounded-[7px] border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='confirmpassword'
                        value={confirmpassword}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    <br />
                    <motion.div
                        className='w-[75%] flex items-center justify-center'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <button
                            className='w-full py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-500 font-semibold'
                        >
                            Reset Password
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
