import { useState, useEffect, useRef } from 'react'
import config from './config'
import './CoursePage.css'
import likeIcon from './img/like.png'
import commentIcon from './img/comment.png'

function CourseDiscussion({ discussionId, title, content, author, date, likesCount, commentsCount }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClampable, setIsClampable] = useState(false)
  const [displayComments, setDisplayComments] = useState(false)
  const [commentData, setCommentData] = useState([])
  const textRef = useRef(null)

  useEffect(() => {
    async function fetchData() {            
      try {
        const commentResponse = await fetch(`${config.API_DISCUSSION_SERVICE_BASE_URL}/api/discussions/${discussionId}/comments`)

        if (!commentResponse.ok) {
          console.log(`Failed to fetch comments for discussion ${discussionId}`)
          throw new Error(`HTTP error! status: ${commentResponse.status}`)
        }
        
        const comments = await commentResponse.json()
        setCommentData(comments)
        console.log("comments: ", comments)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [discussionId])

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
          <span className='course-discussion-date'>{date}</span>
        </div>
        {displayComments && commentData.length > 0 && (
          <ul className='course-discussion-comments-container'>
            {commentData.map(comment => (
              <li key={comment.id} className='course-discussion-comment-card'>
                <button className='course-discussion-profile'>{comment.UserId}</button>
                <div className='course-discussion-main'>
                  <p className='course-discussion-comment-text'>{comment.Content}</p>
                  <div className='course-discussion-footer'>
                    <div className='course-discussion-like-field'>
                      <button className='course-discussion-like-button'>
                        <img className='like-icon' src={likeIcon} alt='Like' />
                      </button>
                      <span>{comment.LikesCount || 0}</span>
                    </div>
                    <span className='course-discussion-date'>{comment.CreatedAt.split('T')[0]}</span>
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

export default CourseDiscussion;