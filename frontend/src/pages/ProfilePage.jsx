import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {
  const { authUser, isCheckingAuth } = useAuthStore()

  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage
