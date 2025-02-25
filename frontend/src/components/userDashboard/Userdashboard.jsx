import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import baseURL from '../../helpers/API';

const Userdashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(null);

  const getUserNotes = async () => {
    const token = localStorage.getItem("access-token");
    try {
      const { data } = await axios.get(`${baseURL}/get-notes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setNotes(data.data);
    } catch (error) {
      toast.error("Error fetching notes.");
    }
  };

  useEffect(() => {
    getUserNotes();
  }, []);

  const handleDeleteNote = async (ele) => {
    const token = localStorage.getItem("access-token");

    try {
      if (!token) {
        toast.error("No token found.");
      } else {
        await axios.delete(`http://localhost:3000/delete-note/${ele._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success("Note deleted successfully.");
        getUserNotes();
      }
    } catch (error) {
      toast.error("Error deleting note.");
    }
  };

  return (
    <motion.div
      className='w-screen h-[91vh] flex items-start justify-start p-3 mt-16 bg-gradient-to-br from-gray-700 via-gray-900 to-black'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className='w-[92%] h-[100%] flex items-start justify-start gap-4 flex-wrap'>
        {notes?.map((e, index) => (
          <motion.div
            key={index}
            className='w-[23%] bg-gray-800 rounded-lg text-white p-4 mt-5 shadow-lg hover:shadow-xl transition-shadow duration-300'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h1 className='text-lg font-bold mb-2'>Subject: <span className='font-normal'>{e.subject}</span></h1>
            <h3 className='text-md font-semibold mb-2'>Title: <span className='font-normal'>{e.title}</span></h3>
            <p className='text-sm mb-4'>Content: {e.content}</p>
            <div className='flex items-center justify-between'>
              <Link
                to="/update_note"
                state={e}
                className='text-xl text-green-500 hover:text-green-400 transition-colors duration-200'
              >
                <MdOutlineEditCalendar />
              </Link>
              <button
                onClick={() => handleDeleteNote(e)}
                className='text-xl text-red-500 hover:text-red-400 transition-colors duration-200'
              >
                <MdDelete />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className='w-[8%] h-[100%] flex items-end justify-center'
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link to='/create_note' className='text-6xl text-blue-500 hover:text-blue-400 transition-colors duration-300'>
          <IoIosAddCircle />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Userdashboard;
