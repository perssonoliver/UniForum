import { useState, useEffect, useRef } from 'react'
import './CoursePage.css'
import likeIcon from './img/like.png'
import commentIcon from './img/comment.png'

function CourseDiscussion({ title, author, date, likesCount, commentsCount }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClampable, setIsClampable] = useState(false)
  const textRef = useRef(null)

  const content = `Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.`

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
    <li className='course-discussion-card'>
      <button className='course-discussion-profile'>{author}</button>
      <div className='course-discussion-main'>
        <h3 className='course-discussion-title'>{title}</h3>
        <p 
          ref={textRef}
          className={`course-discussion-text ${isExpanded ? 'expanded' : ''} ${isClampable ? 'clampable' : ''}`}
          onClick={toggleExpanded}
        >
          {content}
        </p>
        <div className='course-discussion-footer'>
          <div className='course-discussion-like-field'>
            <button className='course-discussion-like-button'>
              <img className='like-icon' src={likeIcon} alt='Like' />
            </button>
            <span>{likesCount}</span>
          </div>
          <div className='course-discussion-comment-field'>
            <button className='course-discussion-comment-button'>
              <img className='like-icon' src={commentIcon} alt='Comment' />
            </button>
            <span>{commentsCount}</span>
          </div>
          <span className='course-discussion-date'>{date}</span>
        </div>
      </div>
    </li>
  )
}

export default CourseDiscussion;