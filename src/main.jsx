import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import AuthProvider from './utils/AuthProvider'
import Signup from './pages/Signup/Signup'
import ThemeProvider from './components/common/Theme/ThemeProvider'

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
    path: '/',
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </ThemeProvider>
)
