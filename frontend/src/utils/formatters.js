export function formatReviewUserName(name) {
  if (!name) return null
  const parts = name.split(' ')
  return parts[0] + ' ' + parts[1][0] + '.'
}

export function formatDiscussionUserName(name) {
  if (!name) return null
  const parts = name.split(' ')
  return parts[0][0] + parts[1][0]
}

export function getTimeAgo(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now - date
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 60) {
    return diffInMinutes <= 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`
  } else {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`
  }
}