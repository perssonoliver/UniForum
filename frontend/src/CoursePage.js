import { useLocation } from 'react-router-dom'
import { useCourseData } from './hooks/useCourseData'
import { formatReviewUserName, formatDiscussionUserName } from './utils/formatters'
import CourseReview from './CourseReview'
import CourseDiscussion from './CourseDiscussion'
import StarRating from './components/StarRating'
import './CoursePage.css'

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
  const location = useLocation()
  const courseData = location.state?.courseData
  
  const {
    reviewData,
    discussionData,
    usersData,
    tagsData,
    averageRating,
    reviewCount,
    isLoading
  } = useCourseData(courseData?.Id)
  
  return (
    !isLoading && (
      <div className='course-container'>
        <CourseHeader 
          courseData={courseData} 
          tagsData={tagsData}
          averageRating={averageRating} 
          reviewCount={reviewCount} 
        />
        <CourseBody 
          reviewData={reviewData} 
          discussionData={discussionData}
          usersData={usersData} 
        />
      </div>
    )
  )
}

export default CoursePage