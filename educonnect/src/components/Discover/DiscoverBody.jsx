// src/components/Discover/DiscoverBody.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockQuestions } from '../../data'
import URLInput from './URLInput'
import StickySearchBar from './StickySearchBar'
import SearchFilters from './SearchFilters'
import QuestionList from './QuestionList'

const DiscoverBody = () => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [directUrl, setDirectUrl] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    aiEnabled: 'all',
    responseType: 'all',
    difficulty: 'all',
    sortBy: 'newest'
  })
  
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const [showUrlBar, setShowUrlBar] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [filters])

//   Optimized scroll handler
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        
        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) {
            ticking = false
            return
          }
          
          const currentScrollY = scrollContainerRef.current.scrollTop
          
          // Update states
          if (currentScrollY > 100 !== isSearchSticky) {
            setIsSearchSticky(currentScrollY > 100)
          }
          
          if (currentScrollY < 50 !== showUrlBar) {
            setShowUrlBar(currentScrollY < 50)
          }
          
          ticking = false
        })
      }
    }
    
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Initial check
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isSearchSticky, showUrlBar])

  const fetchQuestions = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      let filtered = [...mockQuestions]
      
      if (filters.category !== 'all') {
        filtered = filtered.filter(q => q.category === filters.category)
      }
      
      if (filters.aiEnabled === 'yes') {
        filtered = filtered.filter(q => q.aiEnabled)
      } else if (filters.aiEnabled === 'no') {
        filtered = filtered.filter(q => !q.aiEnabled)
      }
      
      if (filters.responseType !== 'all') {
        filtered = filtered.filter(q => q.responseType === filters.responseType)
      }
      
      if (filters.difficulty !== 'all') {
        filtered = filtered.filter(q => q.difficulty === filters.difficulty)
      }
      
      switch(filters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          break
        case 'most-answers':
          filtered.sort((a, b) => b.answerCount - a.answerCount)
          break
        case 'least-answers':
          filtered.sort((a, b) => a.answerCount - b.answerCount)
          break
      }
      
      setQuestions(filtered)
      setLoading(false)
    }, 500)
  }, [filters])

  const handleQuestionClick = useCallback((questionId) => {
    navigate(`/answer/${questionId}`)
  }, [navigate])

  const handleDirectUrlSubmit = useCallback(() => {
    if (directUrl.trim()) {
      const match = directUrl.match(/\/answer\/([a-zA-Z0-9-_]+)/)
      if (match) {
        navigate(`/answer/${match[1]}`)
      }
    }
  }, [directUrl, navigate])

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleShareQuestion = useCallback((questionId) => {
    const url = `${window.location.origin}/answer/${questionId}`
    navigator.clipboard.writeText(url)
    // In real app, show notification
    console.log('Copied to clipboard:', url)
  }, [])

  const categories = ['all', 'Mathematics', 'Chemistry', 'Physics', 'Programming', 'History', 'Biology', 'Business']

  return (
    <div 
      ref={scrollContainerRef}
      className="h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-4 md:p-6"
    >

      {/* URL Input */}
      <URLInput
        directUrl={directUrl}
        onUrlChange={(e) => setDirectUrl(e.target.value)}
        onSubmit={handleDirectUrlSubmit}
        visible={showUrlBar}
      />

      {/* Sticky Search Bar */}
      <StickySearchBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onClearSearch={() => setSearchQuery('')}
        isSticky={isSearchSticky}
        showAdvancedToggle={!isSearchSticky}
        onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
        isAdvancedOpen={showAdvanced}
      />

      {/* Advanced Filters */}
      <div 
        className={`transition-all duration-300 ease-out overflow-hidden ${
          showAdvanced 
            ? 'max-h-96 opacity-100 mb-4' 
            : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionProperty: 'max-height, opacity',
          willChange: 'max-height, opacity'
        }}
      >
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
        />
      </div>

      {/* Questions List */}
      <div className={`transition-padding duration-200 ${isSearchSticky ? 'pt-16' : 'pt-0'}`}>
        <QuestionList
          questions={questions}
          loading={loading}
          onQuestionClick={handleQuestionClick}
          onShareQuestion={handleShareQuestion}
        />

        {/* Mobile-only Quick Stats */}
        <div className="lg:hidden mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1,234</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">New Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">5,678</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Answers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverBody