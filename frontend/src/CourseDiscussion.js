import { useState, useEffect, useRef } from 'react'
import { useDiscussionComments } from './hooks/useDiscussionComments'
import { formatDiscussionUserName, getTimeAgo } from './utils/formatters'
import './CoursePage.css'
import likeIcon from './img/like.png'
import commentIcon from './img/comment.png'

function CourseDiscussion({ 
  discussionId, title, content, author, date, 
  likesCount, commentsCount 
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClampable, setIsClampable] = useState(false)
  const [displayComments, setDisplayComments] = useState(false)
  const textRef = useRef(null)

  const { commentData, commentsUserData } = useDiscussionComments(discussionId)

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

  const toggleComments = () => {
    setDisplayComments(!displayComments)
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
            <button className='course-discussion-comment-button' onClick={toggleComments}>
              <img className='like-icon' src={commentIcon} alt='Comment' />
            </button>
            <span>{commentsCount}</span>
          </div>
          <span className='course-discussion-date'>{getTimeAgo(date)}</span>
        </div>
        {commentData.length > 0 && (
          <ul className={`course-discussion-comments-container ${displayComments ? 'show' : 'hide'}`}>
            {commentData.map(comment => (
              <li key={comment.Id} className='course-discussion-comment-card'>
                <button className='course-discussion-profile'>
                  {formatDiscussionUserName(commentsUserData[comment.UserId]) || "JD"}
                </button>
                <div className='course-discussion-main'>
                  <p className='course-discussion-comment-text'>{comment.Content}</p>
                  <div className='course-discussion-footer'>
                    <div className='course-discussion-like-field'>
                      <button className='course-discussion-like-button'>
                        <img className='like-icon' src={likeIcon} alt='Like' />
                      </button>
                      <span>{comment.LikesCount || 0}</span>
                    </div>
                    <span className='course-discussion-date'>{getTimeAgo(comment.CreatedAt)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default CourseDiscussion