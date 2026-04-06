import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 p-4 border-b">
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  )
}

export default Navbar
