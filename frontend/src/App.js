import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import CoursePage from './CoursePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/course/:courseCode" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App