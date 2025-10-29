import { useEffect, useState } from 'react'
import config from '../config'

const CACHE_KEY = 'unihelper_courses_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

const cacheManager = {
  get() {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null
      
      const { data, timestamp } = JSON.parse(cached)
      
      if (Date.now() - timestamp < CACHE_TTL) {
        return data
      } else {
        this.clear()
        return null
      }
    } catch (error) {
      console.error('Error reading cache:', error)
      return null
    }
  },
  
  set(data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Error setting cache:', error)
    }
  },
  
  clear() {
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.error('Error clearing cache:', error)
    }
  }
}

export const useCourses = () => {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCourses = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const cachedData = cacheManager.get()
        if (cachedData) {
          setCourses(cachedData)
          setIsLoading(false)
          return
        }
      }

      setIsLoading(true)
      setError(null)
      const response = await fetch(`${config.API_COURSE_SERVICE_BASE_URL}/api/courses`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      // Sort courses by Name
      const sortedData = data.sort((a, b) => a.Name.localeCompare(b.Name))
      
      cacheManager.set(sortedData)
      setCourses(sortedData)
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return { 
    courses, 
    isLoading, 
    error, 
    refetch: () => fetchCourses(true),
    clearCache: cacheManager.clear
  }
}