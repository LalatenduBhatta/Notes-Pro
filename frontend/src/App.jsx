import React, { Children } from 'react'
// import Navbar from './components/navbar/Navbar'
import Root from './Root'
import Dashboard from './components/pages/dashboard/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/pages/login/Login'
import Register from './components/pages/register/Register'
import ResetPassword from './components/pages/resetpassword/ResetPassword'
import Userdashboard from './components/userDashboard/Userdashboard'
import CreateNote from './components/userDashboard/note/createnote/CreateNote'
import UpdateNote from './components/userDashboard/note/updatenote/UpdateNote'
import ProtectedRoute from './components/protectedRouting/ProtectedRoute'
import AboutPage from './components/Aboutpage/AboutPage'
import ContactPage from './contactPage/ContactPage'
// import { ToastContainer } from 'react-toastify'

const App = () => {
    const route = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    path: "/reset",
                    element: <ResetPassword />
                },
                {
                    path: "/AboutPage",
                    element: <AboutPage />

                },
                {
                    path: "/contactpage",
                    element: <ContactPage />

                },
                {
                    path: "/user_dashboard",
                    element: <ProtectedRoute>
                        < Userdashboard />
                    </ProtectedRoute>,
                },
                {
                    path: "/create_note",
                    element: <ProtectedRoute>
                        <CreateNote />
                    </ProtectedRoute>
                },
                {
                    path: "/update_note",
                    element: <ProtectedRoute>
                        <UpdateNote />
                    </ProtectedRoute>
                }
            ]
        }
    ])
    return (
        <div>
            <RouterProvider router={route} />
            {/* <ToastContainer />   */}
        </div>
    )
}

export default App
