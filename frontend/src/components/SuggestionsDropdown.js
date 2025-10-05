const SuggestionsDropdown = ({ 
  suggestions, 
  isLoading, 
  searchQuery, 
  onSelectSuggestion,
  isVisible 
}) => {
  if (!isVisible) return null

  return (
    <div className='suggestions-container'>
      {isLoading ? (
        <div className='suggestion-item'>Loading courses...</div>
      ) : suggestions.length > 0 ? (
        suggestions.map((course, index) => (
          <div
            key={index}
            className='suggestion-item'
            onClick={() => onSelectSuggestion(course)}
          >
            {course}
          </div>
        ))
      ) : searchQuery && (
        <div className='suggestion-item'>No courses found</div>
      )}
    </div>
  )
}

export default SuggestionsDropdown;