import { useState, useEffect } from 'react'
import './LoadingBar.css'

function LoadingBar() {
  const [isCompleting, setIsCompleting] = useState(false)

  useEffect(() => {
    const minDisplayTimer = setTimeout(() => {
      setIsCompleting(true)
    }, 300)

    return () => clearTimeout(minDisplayTimer)
  }, [])

  return (
    <div className="loading-bar-container">
      <div className={`loading-bar ${isCompleting ? 'completing' : ''}`}></div>
    </div>
  )
}

export default LoadingBar