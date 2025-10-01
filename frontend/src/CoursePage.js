import './CoursePage.css'
import StarRating from './components/StarRating'
import like from './img/like.png'
import dislike from './img/thumbs_down.png'

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
              rating={5} author="Oliver P." title="Great course!" 
              likesCount={10} dislikesCount={2}
            />
            <CourseReview 
              rating={4} author="Anonymous" title="Very informative" 
              likesCount={5} dislikesCount={1}
            />
            <CourseReview 
              rating={5} author="Jonathan S." title="Loved it!" 
              likesCount={8} dislikesCount={0}
            />
            <CourseReview 
              rating={4} author="Anonymous" title="Well structured" 
              likesCount={6} dislikesCount={1}
            />
            <CourseReview 
              rating={3} author="Anonymous" title="Could be better" 
              likesCount={3} dislikesCount={4}
            />
          </ul>
        </div>
      </div>
      <div className='course-body-discussions-container'>
        <h1>Discussions</h1>
        <div className='course-body-discussions-list'>
          <div className='course-discussion-card'></div>
        </div>
      </div>
    </div>
  )
}

function CourseReview({ rating, author, title, likesCount, dislikesCount }) {
  return (
    <li className='course-review-card'>
      <div className='course-review-rating'>
        <StarRating rating={rating} />
        <span className='course-review-author'>{author}</span>
      </div>
      <h3 className='course-review-title'>{title}</h3>
      <p className='course-review-text'>{`Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua.`}
      </p>
      <div className='course-review-footer'>
        <button className='course-review-like-button'>
          <img className='like-icon' src={like} alt='Like' />
        </button>
        <span className='course-review-like-count'>{likesCount}</span>
        {/*
          <button className='course-review-like-button'>
            <img className='like-icon' src={dislike} alt='Dislike' />
          </button>
          <span className='course-review-like-count'>{dislikesCount}</span>
        */}
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