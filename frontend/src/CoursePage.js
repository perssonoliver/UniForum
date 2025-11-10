import { useState } from 'react'
import { useLoaderData, useNavigate, Outlet } from 'react-router-dom'
import { formatReviewUserName, formatDiscussionUserName } from './utils/formatters'
import CourseReview from './CourseReview'
import CourseDiscussion from './CourseDiscussion'
import StarRating from './components/StarRating'
import SearchForm from './components/SearchForm'
import apiService from './services/apiService'
import config from './config'
import './CoursePage.css'
import logoIcon from './img/logo.png'

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
            {averageRating > 0 && 
              <span className='course-header-rating-value'>{averageRating.toFixed(1)}</span>
            }
            {averageRating > 0 ? 
              <span className='course-header-review-count'>
                {reviewCount === 1 ? `${reviewCount} review` : `${reviewCount} reviews`}
              </span> : 
              <span className='course-header-review-count'>No reviews yet</span>
            }
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
  const navigate = useNavigate()

  function handleAddReview() {
    navigate('add-review', { replace: false })
  }

  function handleAddDiscussion() {
    navigate('add-discussion', { replace: false })
  }

  const filteredReviews = reviewData.filter(review => review.Title && review.Content)

  return (
    <div className='course-body-container'>
      <div className='course-body-reviews-container'>
        <div className='course-body-reviews-header'>
          <div className='course-body-reviews-header-title'>Reviews</div>
          <AddButton handler={handleAddReview} />
        </div>
        <div className='course-reviews-list-container'>
          {filteredReviews.length === 0 && 
            <h3 className='course-reviews-empty'>
              No written reviews yet. Be the first to leave a review!
            </h3>
          }
          <ul className='course-reviews-list'>
            {filteredReviews.map((review, index) => (
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
          <AddButton handler={handleAddDiscussion} />
        </div>
        <div className='course-discussions-list-container'>
          {discussionData.length === 0 && 
            <h3 className='course-reviews-empty'>
              Have something on your mind? Start a discussion!
            </h3>
          }
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

function AddButton({ handler }) {
  return (
    <button className='course-add-button' onClick={handler}>
      <span className='course-add-button-plus'>+</span>
      <span className='course-add-button-text'>Add</span>
    </button>
  )
}

export function AddReviewPopup() {
  const [rating, setRating] = useState(0)
  const navigate = useNavigate()

  const handleClosePopup = (e) => {
    if (e.currentTarget !== e.target) {
      return
    }
    navigate('..', { replace: true })
  }

  return (
    <div className='add-review-popup-overlay' onClick={handleClosePopup}> 
      <div className='add-review-popup'>
        <StarRating rating={rating} editable={true} onRatingChange={setRating} />
        <input className='add-review-popup-title' type='text' placeholder='Title (optional)' required />
        <textarea className='add-review-popup-content' placeholder='Leave your thoughts here... (optional)' required></textarea>
        <button 
          className={`add-review-popup-submit ${rating === 0 ? 'disabled' : ''}`} 
          type='submit'
          title={rating === 0 ? 'Please select a rating before submitting' : ''}
        >
          Submit Review
        </button>
      </div>
    </div>
  )
}

export function AddDiscussionPopup() {
  const [valid, setValid] = useState(false)
  const navigate = useNavigate()
  
  const handleClosePopup = (e) => {
    if (e.currentTarget !== e.target) {
      return
    }
    navigate('..', { replace: true })
  }
  
  return (
    <div className='add-review-popup-overlay' onClick={handleClosePopup}> 
      <div className='add-review-popup'>
        <input className='add-review-popup-title' type='text' placeholder='Title' required />
        <textarea className='add-review-popup-content' placeholder='Leave your thoughts here... (optional)' required></textarea>
        <button 
          className={`add-review-popup-submit ${!valid ? 'disabled' : ''}`} 
          type='submit'
        >
          Submit Discussion
        </button>
      </div>
    </div>
  )
}

function CoursePage() {
  const navigate = useNavigate()
  const loaderData = useLoaderData()
  
  return (
    <div className='course-page'>
      <div className='course-page-menu'>
        <button 
          className='course-page-menu-home-button' 
          type='submit'
          onClick={() => navigate('/')}
        >
          <img className='logo-icon' src={logoIcon} alt='Logo' />
        </button>
        <SearchForm miniFormat={true} />
      </div>
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

      <Outlet />
    </div>
  )
}

export default CoursePage