import { useState, useEffect } from 'react'
import apiService from '../services/apiService'

export function useCourseData(courseId) {
  const [reviewData, setReviewData] = useState([])
  const [discussionData, setDiscussionData] = useState([])
  const [usersData, setUsersData] = useState({})
  const [tagsData, setTagsData] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (!courseId) return
      
      setIsLoading(true)
      
      try {
        const [reviews, discussions, tags] = await Promise.all([
          apiService.getCourseReviews(courseId),
          apiService.getCourseDiscussions(courseId),
          apiService.getCourseTags(courseId)
        ])
        
        setReviewData(reviews)
        setDiscussionData(discussions)
        setTagsData(tags)

        const reviewUserIds = reviews
          .map(review => review.UserId)
          
        const discussionUserIds = discussions
          .map(discussion => discussion.UserId)
          
        const userIds = [...new Set([...reviewUserIds, ...discussionUserIds])]
          .filter(id => id)
        
        if (userIds.length > 0) {
          const userPromises = userIds.map(async (userId) => {
            try {
              return await apiService.getUser(userId)
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
  }, [courseId])

  return {
    reviewData,
    discussionData,
    usersData,
    tagsData,
    averageRating,
    reviewCount,
    isLoading
  }
}