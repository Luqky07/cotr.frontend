import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import AuthProvider from './utils/AuthProvider'
import Signup from './pages/Signup/Signup'
import ThemeProvider from './components/common/Theme/ThemeProvider'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import ChangePasswordRequest from './pages/ChangePasswordRequest/ChangePasswordRequest'
import Profile from './pages/Profile/Profile'
import Languaje from './pages/Languaje/Languaje'
import NoExist from './pages/NoExist/NoExist'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/change-password',
    element: <ChangePassword/>
  },
  {
    path: '/change-password-request',
    element: <ChangePasswordRequest/>
  },
  {
    path: '/',
    element: <ProtectedRoute/>,
    children: [
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "user/profile/:userId",
        element: <Profile/>
      },
      {
        path: "languajes/:languajeId",
        element: <Languaje/>
      }
    ]
  },
  {
    path: '*',
    element: <NoExist/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </ThemeProvider>
)
