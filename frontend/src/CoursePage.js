import './CoursePage.css'
import StarRating from './components/StarRating'

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
      <div className='course-body-reviews'>
        <h1>Reviews</h1>
        <div className='course-body-reviews-list'>
          <div className='course-review-card'></div>
        </div>
      </div>
      <div className='course-body-discussions'>
        <h1>Discussions</h1>
        <div className='course-body-discussions-list'>
          <div className='course-discussion-card'></div>
        </div>
      </div>
    </div>
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