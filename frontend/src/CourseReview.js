import './CoursePage.css'
import StarRating from './components/StarRating'
import likeIcon from './img/like.png'

function CourseReview({ rating, author, title, likesCount }) {
  return (
    <li className='course-review-card'>
      <div className='course-review-rating'>
        <StarRating rating={rating} />
        <span className='course-review-author'>{author}</span>
      </div>
      <h3 className='course-review-title'>{title}</h3>
      <p className='course-review-text'>{`Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}
      </p>
      <div className='course-review-footer'>
        <button className='course-review-like-button'>
          <img className='like-icon' src={likeIcon} alt='Like' />
        </button>
        <span>{likesCount}</span>
      </div>
    </li>
  )
}

export default CourseReview;