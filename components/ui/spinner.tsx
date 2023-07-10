import React from 'react'

interface SpinnerProps {
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-y-2 border-blue-500"></div>
    </div>
  )
}

export default Spinner
