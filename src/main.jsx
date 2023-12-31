import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routes.jsx'
import UserAuthProvider from './context/UserAuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  </React.StrictMode>,
)
