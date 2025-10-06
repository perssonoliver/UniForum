import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import config from './config'
import CourseReview from './CourseReview'
import CourseDiscussion from './CourseDiscussion'
import StarRating from './components/StarRating'
import './CoursePage.css'

function CourseHeader({ courseData }) {
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (!courseData?.Id) return;
      
      setIsLoading(true)
      
      try {
        const response = await fetch(`${config.API_REVIEW_SERVICE_BASE_URL}/api/courses/${courseData.Id}/reviews`)

        if (!response.ok) {
          console.log(`Failed to fetch reviews for course ${courseData.Id}`)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setAverageRating(() => {
          if (data.length === 0) return 0
          const total = data.reduce((sum, review) => sum + review.Rating, 0)
          return total / data.length
        })
        setReviewCount(data.length)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false)
      }
    };
    fetchData()
  }, [courseData?.Id])
  
  return (
    <div className='course-header-container'>
      <span className='course-header-title'>{courseData?.Name || 'Course Name'}</span>
      <span className='course-header-subtitle'>
        {courseData?.Code} ({courseData?.Level}, {courseData?.Credits} hp)
      </span>
      <div className='course-header-reviews'>
        <div className='course-header-rating'>
          <StarRating rating={averageRating} />
          {isLoading ? (
            <>
              <span className='course-header-review-count'>Loading reviews...</span>
            </>
          ) : (
            <>
              <span className='course-header-rating-value'>{averageRating.toFixed(1)}</span>
              <span className='course-header-review-count'>{reviewCount} reviews</span>
            </>
          )}
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
              rating={5} author="Oliver P." date="2025-08-26"
              title="Great course!" likesCount={10}
            />
            <CourseReview 
              rating={4} author="Anonymous" date="2024-11-12"
              title="Very informative" likesCount={5}
            />
            <CourseReview 
              rating={5} author="Jonathan S." date="2024-11-05"
              title="Loved it!" likesCount={8}
            />
            <CourseReview 
              rating={4} author="Anonymous" date="2024-11-02"
              title="Well structured" likesCount={6}
            />
            <CourseReview 
              rating={3} author="Anonymous" date="2024-10-27"
              title="Could be better" likesCount={3}
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