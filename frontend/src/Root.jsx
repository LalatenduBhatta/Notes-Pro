import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import toast, { Toaster } from 'react-hot-toast';


const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
      {/* <Toaster /> */}
    </div>
  )
}

export default Root
