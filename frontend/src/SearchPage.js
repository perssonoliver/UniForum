import './SearchPage.css'
import SearchForm from './components/SearchForm'

function SearchPage() {
  return (
    <div className='search-page-container'>
      <div className='search-content'>
        <h1 className='search-title'>Welcome to UniForum!</h1>
        <SearchForm />
      </div>
    </div>
  )
}

export default SearchPage