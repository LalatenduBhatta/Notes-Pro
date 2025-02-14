import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import baseURL from '../../../../helpers/API';

const UpdateNote = () => {
    const navigate = useNavigate();
    const particularNote = useLocation();
    const particularNoteId = particularNote.state._id;

    const [notes, setNotes] = useState({
        title: "",
        content: "",
        subject: ""
    });

    const { title, content, subject } = notes;

    useEffect(() => {
        setNotes(particularNote.state);
    }, [particularNote.state]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNotes({ ...notes, [name]: value });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access-token");

        try {
            if (!token) {
                toast.error("There is no token");
            } else {
                await axios.put(`${baseURL}/update-note/${particularNoteId}`, notes, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                toast.success("Note updated successfully");
                navigate("/user_dashboard");
            }
        } catch (error) {
            toast.error("Failed to update the note");
        }
    };

    return (
        <div className='w-screen h-[91vh] flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-300'>
            <motion.div
                className='w-[35%] h-[70%] shadow-xl shadow-black bg-white rounded-lg'
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
                    <h1 className='text-3xl font-mono font-semibold text-blue-800'>Update Note</h1>
                </motion.div>

                <form
                    onSubmit={handleForm}
                    className='w-full h-[75%] flex items-center justify-center flex-col gap-4'
                >
                    <motion.input
                        type="text"
                        placeholder='Subject'
                        className='w-[75%] px-4 py-2 rounded-lg border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='subject'
                        value={subject}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.input
                        type="text"
                        placeholder='Title'
                        className='w-[75%] px-4 py-2 rounded-lg border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='title'
                        value={title}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    <motion.textarea
                        type="text"
                        placeholder='Content'
                        rows="5"
                        className='w-[75%] px-4 py-2 rounded-lg border-2 border-blue-800 outline-none focus:ring-2 focus:ring-blue-400'
                        name='content'
                        value={content}
                        onChange={handleInput}
                        required
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    <motion.div
                        className='w-[75%] flex items-center justify-center'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <button
                            className='w-full py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-500 font-semibold'
                        >
                            Update
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdateNote;
