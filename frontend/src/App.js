import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SearchPage from './SearchPage'
import CoursePage, { courseLoader } from './CoursePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />
  },
  {
    path: "/course/:courseCode",
    element: <CoursePage />,
    loader: courseLoader
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App