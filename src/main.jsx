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
import Language from './pages/Language/Language'
import NoExist from './pages/NoExist/NoExist'
import TryExercise from './pages/TryExercise/TryExercise'
import CreateExercise from './pages/CreateExercise/CreateExercise'
import EditExercise from './pages/EditExercise/EditExercise'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'

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
    path: '/user/verify',
    element: <VerifyEmail/>
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
        path: "languages/:languageId",
        element: <Language/>
      },
      {
        path: "exercise",
        children: [
          {
            path: "",
            element: <CreateExercise/>
          },
          {
            path: ":exerciseId",
            children:[
              {
                path: "",
                element: <TryExercise/>
              },
              {
                path: "edit",
                element: <EditExercise/>
              }
            ]
          }
        ]
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
