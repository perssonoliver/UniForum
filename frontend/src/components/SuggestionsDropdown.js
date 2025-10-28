const SuggestionsDropdown = ({ 
  suggestions, 
  isLoading, 
  searchQuery, 
  onSelectSuggestion,
  isVisible, 
  miniFormat
}) => {
  if (!isVisible) return null

  const formatCourseForDisplay = (course) => {
    return `${course.Name} (${course.Code})`
  }

  return (
    <div className={`suggestions-container${miniFormat ? '-mini' : ''}`}>
      {isLoading ? (
        <div className='suggestion-item'>Loading courses...</div>
      ) : suggestions.length > 0 ? (
        suggestions.map((course, index) => (
          <div
            key={course.Code || index}
            className='suggestion-item'
            onClick={() => onSelectSuggestion(course)}
          >
            {formatCourseForDisplay(course)}
          </div>
        ))
      ) : searchQuery && (
        <div className='suggestion-item'>No courses found</div>
      )}
    </div>
  )
}

export default SuggestionsDropdown;