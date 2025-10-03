import './SearchPage.css'
import { useState } from 'react'

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    // Add your search logic here
    console.log('Searching for:', searchQuery)
    const response = await fetch("http://localhost:7071/api/courses");
    //const response = await fetch("https://unihelpercourseservice.azurewebsites.net/api/courses");
    const data = await response.json();
    console.log(data); 
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type='submit' className='search-button'>
              <svg className='search-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <circle cx='11' cy='11' r='8'></circle>
                <path d='m21 21-4.35-4.35'></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchPage;