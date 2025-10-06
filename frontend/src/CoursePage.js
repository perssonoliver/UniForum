import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import config from './config'
import CourseReview from './CourseReview'
import CourseDiscussion from './CourseDiscussion'
import StarRating from './components/StarRating'
import './CoursePage.css'

function formatUserName(name) {
  const parts = name.split(' ')
  return parts[0] + ' ' + parts[1][0] + '.'
}

function CourseHeader({ courseData, averageRating, reviewCount, isLoading }) {
  
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

function CourseBody( { reviewData, usersData, isLoading } ) {
  return (
    <div className='course-body-container'>
      <div className='course-body-reviews-container'>
        <h1>Reviews</h1>
        <div className='course-reviews-list-container'>
          <ul className='course-reviews-list'>
            {reviewData
              .filter(review => review.Title && review.Content)
              .map((review, index) => (
                <CourseReview 
                  key={review.Id || index}
                  rating={review.Rating} 
                  author={review.IsAnonymous ? "Anonymous" : (formatUserName(usersData[review.UserId]) || "Unknown User")}
                  date={review.CreatedAt.split('T')[0]}
                  title={review.Title} 
                  content={review.Content} 
                  likesCount={review.LikesCount || 0}
                />
              ))}
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
  const [reviewData, setReviewData] = useState([])
  const [usersData, setUsersData] = useState({})
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const courseData = location.state?.courseData

  useEffect(() => {
    async function fetchData() {
      if (!courseData?.Id) return;
      
      setIsLoading(true)
      
      try {
        const reviewResponse = await fetch(`${config.API_REVIEW_SERVICE_BASE_URL}/api/courses/${courseData.Id}/reviews`)

        if (!reviewResponse.ok) {
          console.log(`Failed to fetch reviews for course ${courseData.Id}`)
          throw new Error(`HTTP error! status: ${reviewResponse.status}`)
        }
        
        const reviews = await reviewResponse.json()
        setReviewData(reviews)
        
        const userIds = [...new Set(
          reviews
            .filter(review => !review.IsAnonymous)
            .map(review => review.UserId)
        )]
        
        if (userIds.length > 0) {
          const userPromises = userIds.map(async (userId) => {
            try {
              const userResponse = await fetch(`${config.API_USER_SERVICE_BASE_URL}/api/users/${userId}`)
              if (userResponse.ok) {
                return await userResponse.json()
              } else {
                console.warn(`Failed to fetch user ${userId}`)
                return { Id: userId, Name: "Unknown User" }
              }
            } catch (error) {
              console.warn(`Error fetching user ${userId}:`, error)
              return { Id: userId, Name: "Unknown User" }
            }
          })
          
          const users = await Promise.all(userPromises)
          
          const userLookup = users.reduce((acc, user) => {
            acc[user.Id] = user.Name
            return acc
          }, {})
          
          setUsersData(userLookup)
        }
        
        setAverageRating(() => {
          if (reviews.length === 0) return 0
          const total = reviews.reduce((sum, review) => sum + review.Rating, 0)
          return total / reviews.length
        })
        setReviewCount(reviews.length)
        
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [courseData?.Id])
  
  return (
    <div className='course-container'>
      <CourseHeader 
        courseData={courseData} averageRating={averageRating} 
        reviewCount={reviewCount} isLoading={isLoading}
      />
      <CourseBody 
        reviewData={reviewData} usersData={usersData} isLoading={isLoading}
      />
    </div>
  )
}

export default CoursePage;