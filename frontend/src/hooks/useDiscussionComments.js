import { useState, useEffect } from 'react'
import apiService from '../services/apiService'

export function useDiscussionComments(discussionId) {
  const [commentData, setCommentData] = useState([])
  const [commentsUserData, setCommentsUsersData] = useState({})

  useEffect(() => {
    async function fetchComments() {
      if (!discussionId) return
      
      try {
        const comments = await apiService.getDiscussionComments(discussionId)
        setCommentData(comments.sort((a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt)))

        const commentsUserIds = comments.map(comment => comment.UserId)

        if (commentsUserIds.length > 0) {
          const userPromises = commentsUserIds.map(async (userId) => {
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
          
          setCommentsUsersData(userLookup)
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    
    fetchComments()
  }, [discussionId])

  return { commentData, commentsUserData }
}