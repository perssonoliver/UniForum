import './App.css'
import { createBrowserRouter, RouterProvider, useNavigation, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SearchPage from './SearchPage'
import CoursePage, { courseLoader } from './CoursePage'
import LoadingBar from './components/LoadingBar'

function RootLayout() {
  const navigation = useNavigation()
  const [showLoadingBar, setShowLoadingBar] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    if (navigation.state === 'loading') {
      setShowLoadingBar(true)
      setLoadingComplete(false)
    } else if (navigation.state === 'idle' && showLoadingBar) {
      setLoadingComplete(true)
      const timer = setTimeout(() => {
        setShowLoadingBar(false)
        setLoadingComplete(false)
      }, 300) // 100ms min display + 200ms completion animation

      return () => clearTimeout(timer)
    }
  }, [navigation.state, showLoadingBar])

  return (
    <>
      {showLoadingBar && <LoadingBar onLoadingComplete={loadingComplete} />}
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SearchPage />
      },
      {
        path: "/course/:courseCode",
        element: <CoursePage />,
        loader: courseLoader
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App