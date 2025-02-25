import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import baseURL from '../../../../helpers/API';

const CreateNote = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState({
        title: "",
        content: "",
        subject: ""
    });
    const { title, content, subject } = notes;
    const [reset, setReset] = useState(notes);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNotes({ ...notes, [name]: value });
    };

    const createNote = async () => {
        const token = localStorage.getItem("access-token");
        try {
            const { data } = await axios.post(`${baseURL}/create-note`, notes, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setNotes(reset);
            toast.success("Note Created Successfully");
            navigate("/user_dashboard");
        } catch (error) {
            toast.error("Error creating note. Please try again.");
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();
        createNote();
    };

    return (
        <div className='w-screen h-[100vh] flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500  '>
            <motion.div
                className='w-[35%] h-[70%] shadow-2xl shadow-black bg-white rounded-lg'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className='w-full h-[20%] flex items-center justify-center'
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className='text-3xl font-mono font-semibold text-blue-800'>Create Note</h1>
                </motion.div>

                <form
                    onSubmit={handleForm}
                    className='w-full h-[75%] flex items-center justify-center flex-col'
                >
                    <motion.input
                        type="text"
                        placeholder='Subject'
                        className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='subject'
                        value={subject}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <br />
                    <motion.input
                        type="text"
                        placeholder='Title'
                        className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='title'
                        value={title}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    <br />
                    <motion.textarea
                        type="text"
                        placeholder='Content'
                        rows="5"
                        cols="20"
                        className='w-[75%] px-2 py-2 rounded-[7px] border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='content'
                        value={content}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    <br />
                    <motion.div
                        className='w-[75%] flex items-center justify-center'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <button
                            className='w-full py-2 rounded-[7px] bg-blue-800 text-white hover:bg-blue-900 transition-all duration-500 font-semibold'
                        >
                            Submit
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateNote;
