import { useState, useEffect } from 'react'
import './LoadingBar.css'

function LoadingBar({ onLoadingComplete }) {
  const [isCompleting, setIsCompleting] = useState(false)

  useEffect(() => {
    if (onLoadingComplete) {
      const minDisplayTimer = setTimeout(() => {
        setIsCompleting(true)
      }, 100)

      return () => clearTimeout(minDisplayTimer)
    }
  }, [onLoadingComplete])

  return (
    <div className="loading-bar-container">
      <div className={`loading-bar ${isCompleting ? 'completing' : ''}`}></div>
    </div>
  )
}

export default LoadingBar