import './CoursePage.css'
import likeIcon from './img/like.png'
import commentIcon from './img/comment.png'

function CourseDiscussion({ title, author, date, likesCount, commentsCount }) {
  return (
    <li className='course-discussion-card'>
      <button className='course-discussion-profile'>{author}</button>
      <div className='course-discussion-main'>
        <h3 className='course-discussion-title'>{title}</h3>
        <p className='course-discussion-text'>{`Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}
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