import './CoursePage.css'
import { useParams, useLocation } from 'react-router-dom'
import CourseReview from './CourseReview'
import CourseDiscussion from './CourseDiscussion'
import StarRating from './components/StarRating'

function CourseHeader({ courseData }) {
  const averageRating = 4.3
  const reviewCount = 7
  
  return (
    <div className='course-header-container'>
      <span className='course-header-title'>{courseData?.Name || 'Course Name'}</span>
      <span className='course-header-subtitle'>
        {courseData?.Code} ({courseData?.Level}, {courseData?.Credits} hp)
      </span>
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

function CoursePage() {
  const location = useLocation()
  const courseData = location.state?.courseData
  
  return (
    <div className='course-container'>
      <CourseHeader courseData={courseData} />
      <CourseBody />
    </div>
  )
}

export default CoursePage;