import { useLoaderData } from 'react-router-dom'
import { formatReviewUserName, formatDiscussionUserName } from './utils/formatters'
import CourseReview from './CourseReview'
import CourseDiscussion from './CourseDiscussion'
import StarRating from './components/StarRating'
import apiService from './services/apiService'
import config from './config'
import './CoursePage.css'

export async function courseLoader({ params }) {
  const courseCode = params.courseCode
  
  try {
    const coursesResponse = await fetch(`${config.API_COURSE_SERVICE_BASE_URL}/api/courses`)
    if (!coursesResponse.ok) throw new Error('Failed to fetch courses')
    const courses = await coursesResponse.json()
    
    const course = courses.find(c => c.Code === courseCode)
    if (!course) throw new Error(`Course ${courseCode} not found`)
    
    const courseId = course.Id
    
    const [reviews, discussions, tags] = await Promise.all([
      apiService.getCourseReviews(courseId),
      apiService.getCourseDiscussions(courseId),
      apiService.getCourseTags(courseId)
    ])
    
    const userIds = [
      ...new Set([
        ...reviews.map(r => r.UserId),
        ...discussions.map(d => d.UserId)
      ])
    ].filter(id => id)
    
    const userPromises = userIds.map(async (userId) => {
      try {
        return await apiService.getUser(userId)
      } catch (error) {
        console.warn(`Error fetching user ${userId}:`, error)
        return { Id: userId, Name: "Unknown User" }
      }
    })
    
    const users = await Promise.all(userPromises)
    
    const usersData = users.reduce((acc, user) => {
      acc[user.Id] = user.Name
      return acc
    }, {})
    
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.Rating, 0) / reviews.length
      : 0
    
    return {
      courseData: course,
      reviewData: reviews,
      discussionData: discussions,
      usersData,
      tagsData: tags,
      averageRating,
      reviewCount: reviews.length
    }
  } catch (error) {
    console.error('Error in courseLoader:', error)
    throw error
  }
}

function CourseHeader({ courseData, tagsData, averageRating, reviewCount }) {
  return (
    <div className='course-header-container'>
      <span className='course-header-title'>{courseData?.Name || 'Course Name'}</span>
      <span className='course-header-subtitle'>
        {courseData?.Code} ({courseData?.Level}, {courseData?.Credits} hp)
      </span>
      <div className='course-header-reviews'>
        <div className='course-header-rating'>
          <StarRating rating={averageRating} />
          <>
            <span className='course-header-rating-value'>{averageRating.toFixed(1)}</span>
            <span className='course-header-review-count'>{reviewCount} reviews</span>
          </>
        </div>
      </div>
      <div className='course-header-tags'>
        {tagsData.map(tag => (
          <div key={tag.Id} className='course-tag-card'>{tag.Name}</div>
        ))}
      </div>
    </div>
  )
}

function CourseBody({ reviewData, discussionData, usersData }) {
  return (
    <div className='course-body-container'>
      <div className='course-body-reviews-container'>
        <div className='course-body-reviews-header'>
          <div className='course-body-reviews-header-title'>Reviews</div>
          <AddButton />
        </div>
        <div className='course-reviews-list-container'>
          <ul className='course-reviews-list'>
            {reviewData
              .filter(review => review.Title && review.Content)
              .map((review, index) => (
                <CourseReview 
                  key={review.Id || index}
                  rating={review.Rating} 
                  author={formatReviewUserName(usersData[review.UserId]) || "Unknown User"}
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
        <div className='course-body-discussions-header'>
          <div className='course-body-discussions-header-title'>Discussions</div>
          <AddButton />
        </div>
        <div className='course-discussions-list-container'>
          <ul className='course-discussions-list'>
            {discussionData.map((discussion, index) => (
              <CourseDiscussion
                key={discussion.Id || index}
                discussionId={discussion.Id}
                title={discussion.Title}
                content={discussion.Content}
                author={formatDiscussionUserName(usersData[discussion.UserId]) || "JD"}
                date={discussion.CreatedAt.split('T')[0]}
                likesCount={discussion.LikesCount || 0}
                commentsCount={discussion.CommentsCount || 0}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function AddButton() {
  return (
    <button className='course-add-button'>
      <span className='course-add-button-plus'>+</span>
      <span className='course-add-button-text'>Add</span>
    </button>
  )
}

function CoursePage() {
  const loaderData = useLoaderData()
  
  return (
    <div className='course-container'>
      <CourseHeader 
        courseData={loaderData.courseData} 
        tagsData={loaderData.tagsData}
        averageRating={loaderData.averageRating} 
        reviewCount={loaderData.reviewCount} 
      />
      <CourseBody 
        reviewData={loaderData.reviewData} 
        discussionData={loaderData.discussionData}
        usersData={loaderData.usersData} 
      />
    </div>
  )
}

export default CoursePage