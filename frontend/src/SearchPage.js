import './SearchPage.css'
import SearchForm from './components/SearchForm'
import logoIcon from './img/logo.png'

function SearchPage() {
  return (
    <div className='search-page-container'>
      <div className='search-content'>
        <div className='search-header'>
          <h1 className='search-title'>Welcome to UniForum!</h1>
          <img className='search-logo-icon' src={logoIcon} alt='Logo' />
        </div>
        <SearchForm />
      </div>
    </div>
  )
}

export default SearchPage