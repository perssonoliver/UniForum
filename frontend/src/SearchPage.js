import './SearchPage.css'
import { useState, useMemo, useCallback } from 'react'
import { useCourses } from './hooks/useCourses'
import SuggestionsDropdown from './components/SuggestionsDropdown'

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const { courses, isLoading, error } = useCourses()

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses
    return courses.filter(course => 
      course.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [courses, searchQuery])

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    console.log('Searching for:', searchQuery)
    setShowSuggestions(false)
    // Add your search logic here
  }, [searchQuery])

  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleFocus = useCallback(() => {
    setShowSuggestions(true)
  }, [])

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 200)
  }, [])

  const handleSelectSuggestion = useCallback((suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }, [])

  if (error) {
    return (
      <div className='search-page-container'>
        <div className='error-message'>
          Error loading courses: {error}
        </div>
      </div>
    )
  }

  return (
    <div className='search-page-container'>
      <div className='search-content'>
        <h1 className='search-title'>Welcome to UniForum!</h1>
        
        <form className='search-form' onSubmit={handleSearch}>
          <div className='search-input-container'>
            <input
              type='text'
              className='search-input'
              placeholder='Search for courses...'
              value={searchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInputChange}
              aria-label='Search for courses'
            />
            <button 
              type='submit' 
              className='search-button'
              aria-label='Search'
              disabled={!searchQuery.trim()}
            >
              <svg className='search-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <circle cx='11' cy='11' r='8'></circle>
                <path d='m21 21-4.35-4.35'></path>
              </svg>
            </button>
          </div>
          
          <SuggestionsDropdown
            suggestions={filteredCourses}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSelectSuggestion={handleSelectSuggestion}
            isVisible={showSuggestions}
          />
        </form>
      </div>
    </div>
  )
}

export default SearchPage;