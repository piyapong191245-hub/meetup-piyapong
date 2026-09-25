import { useAuth } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './Loader' // Import คอมโพเนนต์กล้องที่คุณสร้างไว้

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <Loader text="Authenticating..." />
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute