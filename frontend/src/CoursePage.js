import './CoursePage.css'
import StarRating from './components/StarRating'
import likeIcon from './img/like.png'
import commentIcon from './img/comment.png'

function CourseHeader() {
  const averageRating = 4.3
  const reviewCount = 7
  return (
    <div className='course-header-container'>
      <span className='course-header-title'>Flertrådad programmering</span>
      <span className='course-header-subtitle'>EDAP10 (A, 7.5 hp)</span>
      <div className='course-header-reviews'>
        <div className='course-header-rating'>
          <StarRating rating={averageRating} />
          <span className='course-header-rating-value'>{averageRating.toFixed(1)}</span>
          <span className='course-header-review-count'>{reviewCount} reviews</span>
        </div>
      </div>
      <div className='course-header-tags'>
        <div className='course-tag-card'>Programmering</div>
        <div className='course-tag-card'>Java</div>
        <div className='course-add-tag-card'>+ Add tag</div>
      </div>
    </div>
  )
}

function CourseBody() {
  return (
    <div className='course-body-container'>
      <div className='course-body-reviews-container'>
        <h1>Reviews</h1>
        <div className='course-reviews-list-container'>
          <ul className='course-reviews-list'>
            <CourseReview 
              rating={5} author="Oliver P." title="Great course!" likesCount={10}
            />
            <CourseReview 
              rating={4} author="Anonymous" title="Very informative" likesCount={5}
            />
            <CourseReview 
              rating={5} author="Jonathan S." title="Loved it!" likesCount={8}
            />
            <CourseReview 
              rating={4} author="Anonymous" title="Well structured" likesCount={6}
            />
            <CourseReview 
              rating={3} author="Anonymous" title="Could be better" likesCount={3}
            />
          </ul>
        </div>
      </div>
      <div className='course-body-discussions-container'>
        <h1>Discussions</h1>
        <div className='course-discussions-list-container'>
          <ul className='course-discussions-list'>
            <CourseDiscussion 
              title="How are the labs set up?" author="EA" 
              date="2025-09-06" likesCount={5} commentsCount={2}
            />
            <CourseDiscussion 
              title="Is the exam difficult?" author="RS" 
              date="2025-09-05" likesCount={2} commentsCount={1}
            />
            <CourseDiscussion 
              title="Do I need to know Java well?" author="JE" 
              date="2025-09-02" likesCount={3} commentsCount={1}
            />
            <CourseDiscussion 
              title="Is it a heavy course?" author="FH" 
              date="2025-09-02" likesCount={6} commentsCount={3}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

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

function CoursePage() {
  return (
    <div className='course-container'>
      <CourseHeader />
      <CourseBody />
    </div>
  )
}

export default CoursePage;