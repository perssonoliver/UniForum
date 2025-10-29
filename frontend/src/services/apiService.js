import config from '../config'

class ApiService {
  async fetchWithErrorHandling(url, errorMessage) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.log(errorMessage)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(errorMessage, error)
      throw error
    }
  }

  async getCourseReviews(courseId) {
    return this.fetchWithErrorHandling(
      `${config.API_REVIEW_SERVICE_BASE_URL}/api/courses/${courseId}/reviews`,
      `Failed to fetch reviews for course ${courseId}`
    )
  }

  async getCourseDiscussions(courseId) {
    return this.fetchWithErrorHandling(
      `${config.API_DISCUSSION_SERVICE_BASE_URL}/api/courses/${courseId}/discussions`,
      `Failed to fetch discussions for course ${courseId}`
    )
  }

  async getCourseTags(courseId) {
    return this.fetchWithErrorHandling(
      `${config.API_COURSE_SERVICE_BASE_URL}/api/courses/${courseId}/tags`,
      `Failed to fetch tags for course ${courseId}`
    )
  }

  async getUser(userId) {
    return this.fetchWithErrorHandling(
      `${config.API_USER_SERVICE_BASE_URL}/api/users/${userId}`,
      `Failed to fetch user ${userId}`
    )
  }

  async getDiscussionComments(discussionId) {
    return this.fetchWithErrorHandling(
      `${config.API_DISCUSSION_SERVICE_BASE_URL}/api/discussions/${discussionId}/comments`,
      `Failed to fetch comments for discussion ${discussionId}`
    )
  }
}

const apiService = new ApiService()
export default apiService