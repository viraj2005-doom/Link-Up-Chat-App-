import React from 'react'

const Loader = ({ className = '' }) => {
  return (
    <div
      className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-current border-r-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export default Loader
