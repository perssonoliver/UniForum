import { useState, useEffect, useRef } from 'react'
import './CoursePage.css'
import StarRating from './components/StarRating'
import likeIcon from './img/like.png'

function CourseReview({ rating, author, date, title, content, likesCount }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClampable, setIsClampable] = useState(false)
  const textRef = useRef(null)
  
  useEffect(() => {
    const checkIfClampable = () => {
      if (textRef.current) {
        const element = textRef.current
        const isOverflowing = element.scrollHeight > element.clientHeight
        setIsClampable(isOverflowing)
      }
    }

    checkIfClampable()
    
    window.addEventListener('resize', checkIfClampable)
    return () => window.removeEventListener('resize', checkIfClampable)
  }, [content])

  const toggleExpanded = () => {
    if (isClampable) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <li className='course-review-card'>
      <div className='course-review-rating'>
        <StarRating rating={rating} />
        <span className='course-review-author'>{author}</span>
      </div>
      <h3 className='course-review-title'>{title}</h3>
      <p 
        ref={textRef}
        className={`course-review-text ${isExpanded ? 'expanded' : ''} ${isClampable ? 'clampable' : ''}`}
        onClick={toggleExpanded}
      >
        {content}
      </p>
      <div className='course-review-footer'>
        <button className='course-review-like-button'>
          <img className='like-icon' src={likeIcon} alt='Like' />
        </button>
        <span>{likesCount}</span>
        <span className='course-review-date'>{date}</span>
      </div>
    </li>
  )
}

export default CourseReview;