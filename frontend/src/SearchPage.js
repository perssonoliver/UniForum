import './SearchPage.css'
import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCourses } from './hooks/useCourses'
import SuggestionsDropdown from './components/SuggestionsDropdown'

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  
  const { courses, isLoading, error } = useCourses()

  const formatCourseForDisplay = useCallback((course) => {
    return `${course.Name} (${course.Code})`
  }, [])

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses

    const query = searchQuery.toLowerCase()
    return courses.filter(course => 
      course.Name.toLowerCase().includes(query) || 
      course.Code.toLowerCase().includes(query) ||
      formatCourseForDisplay(course).toLowerCase().includes(query)
    )
  }, [courses, searchQuery, formatCourseForDisplay])

  const extractCourseCodeFromInput = useCallback((text) => {
    const matchingCourse = courses.find(course => 
      course.Name.toLowerCase() === text.toLowerCase() ||
      course.Code.toLowerCase() === text.toLowerCase() ||
      formatCourseForDisplay(course).toLowerCase() === text.toLowerCase()
    )
    
    if (matchingCourse) {
      return matchingCourse.Code
    }

    const match = text.match(/\(([^)]+)\)/)
    return match ? match[1].split(',')[0].trim() : null
  }, [courses, formatCourseForDisplay])

  const isValidInput = useMemo(() => {
    if (!searchQuery.trim()) return false
    return extractCourseCodeFromInput(searchQuery) !== null
  }, [searchQuery, extractCourseCodeFromInput])

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (!searchQuery.trim() || !isValidInput) return
    
    setShowSuggestions(false)

    const courseCode = extractCourseCodeFromInput(searchQuery)
    if (courseCode) {
      const courseData = courses.find(course => course.Code === courseCode)
      
      navigate(`/course/${courseCode}`, {
        state: { courseData }
      })
    }
  }, [searchQuery, isValidInput, extractCourseCodeFromInput, navigate, courses])

  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.trim()) {
      setShowSuggestions(true)
    }
  }, [])

  const handleFocus = useCallback(() => {
    if (searchQuery.trim() || courses.length > 0) {
      setShowSuggestions(true)
    }
  }, [searchQuery, courses.length])

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 200)
  }, [])

  const handleSelectSuggestion = useCallback((course) => {
    const displayText = formatCourseForDisplay(course)
    setSearchQuery(displayText)
    setShowSuggestions(false)
  }, [formatCourseForDisplay])

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
              disabled={!isValidInput}
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