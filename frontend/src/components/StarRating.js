import React, { useState, useEffect } from 'react'
import './StarRating.css'

const StarRating = ({ rating = 0, editable = false, onRatingChange }) => {
  const [internalRating, setInternalRating] = useState(rating)
  const [hoverRating, setHoverRating] = useState(null)
  const stars = []
  const minStars = 1
  const maxStars = 5

  useEffect(() => {
    setInternalRating(rating)
  }, [rating])

  const setRating = (value) => {
    const clamped = Math.min(Math.max(value, minStars), maxStars)
    setInternalRating(clamped)
    if (typeof onRatingChange === 'function') onRatingChange(clamped)
  }

  const handleKey = (e, value) => {
    if (!editable) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setRating(value)
    }
  }

  const displayedRating = (hoverRating !== null) ? hoverRating : internalRating

  for (let i = 1; i <= maxStars; i++) {
    const fillPercentage = Math.min(Math.max(displayedRating - i + 1, 0), 1) * 100

    stars.push(
      <div
        key={i}
        className={`star-container ${editable ? 'editable' : ''}`}
        role={editable ? 'button' : undefined}
        tabIndex={editable ? 0 : undefined}
        onClick={() => editable && setRating(i)}
        onKeyDown={(e) => handleKey(e, i)}
        onMouseEnter={() => editable && setHoverRating(i)}
        onMouseLeave={() => editable && setHoverRating(null)}
        aria-label={editable ? `Set rating to ${i}` : `Rating star ${i}`}
      >
        <div className='star-background'>★</div>
        <div
          className='star-filled'
          style={{ width: `${fillPercentage}%` }}
        >
          ★
        </div>
      </div>
    )
  }

  return <div className='star-rating'>{stars}</div>
}

export default StarRating