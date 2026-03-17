import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockQuestions } from '../../data'
import URLInput from './URLInput'
import StickySearchBar from './StickySearchBar'
import SearchFilters from './SearchFilters'
import QuestionList from './QuestionList'

const CATEGORIES = ['all', 'Mathematics', 'Chemistry', 'Physics', 'Programming', 'History', 'Biology', 'Business']

const DiscoverBody = () => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)

  // Refs track current values so the scroll listener never needs re-registering
  const isSearchStickyRef = useRef(false)
  const showUrlBarRef = useRef(true)
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const [showUrlBar, setShowUrlBar] = useState(true)

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [directUrl, setDirectUrl] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    aiEnabled: 'all',
    sortBy: 'newest',
  })

  // Register scroll listener exactly once — refs prevent stale closure issues
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const onScroll = () => {
      const y = el.scrollTop
      const sticky = y > 100
      const urlVisible = y < 50

      if (sticky !== isSearchStickyRef.current) {
        isSearchStickyRef.current = sticky
        setIsSearchSticky(sticky)
      }
      if (urlVisible !== showUrlBarRef.current) {
        showUrlBarRef.current = urlVisible
        setShowUrlBar(urlVisible)
      }
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, []) // empty — never re-registers

  // Debounced filter + search
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let result = [...mockQuestions]

      if (filters.category !== 'all') result = result.filter(q => q.category === filters.category)
      if (filters.aiEnabled === 'yes') result = result.filter(q => q.aiEnabled)
      if (filters.aiEnabled === 'no')  result = result.filter(q => !q.aiEnabled)

      if (searchQuery.trim()) {
        const s = searchQuery.toLowerCase()
        result = result.filter(q =>
          q.title?.toLowerCase().includes(s) ||
          q.content?.toLowerCase().includes(s) ||
          q.creator?.username?.toLowerCase().includes(s)
        )
      }

      switch (filters.sortBy) {
        case 'newest':       result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
        case 'oldest':       result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break
        case 'most-answers': result.sort((a, b) => b.answerCount - a.answerCount); break
        case 'least-answers':result.sort((a, b) => a.answerCount - b.answerCount); break
      }

      setQuestions(result)
      setLoading(false)
    }, 300) // debounce — cancels if deps change before 300ms

    return () => clearTimeout(timer)
  }, [filters, searchQuery])

  const handleQuestionClick  = useCallback((id) => navigate(`/answer/${id}`), [navigate])
  const handleFilterChange   = useCallback((key, value) => setFilters(prev => ({ ...prev, [key]: value })), [])
  const handleShareQuestion  = useCallback((id) => {
    navigator.clipboard.writeText(`${window.location.origin}/answer/${id}`)
  }, [])
  const handleDirectUrlSubmit = useCallback(() => {
    const match = directUrl.match(/\/answer\/([a-zA-Z0-9-_]+)/)
    if (match) navigate(`/answer/${match[1]}`)
  }, [directUrl, navigate])

  return (
    <div ref={scrollContainerRef} className="h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
      <div className="p-4 md:p-6 space-y-4">

        <URLInput
          directUrl={directUrl}
          onUrlChange={(e) => setDirectUrl(e.target.value)}
          onSubmit={handleDirectUrlSubmit}
          visible={showUrlBar}
        />

        <StickySearchBar
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onClearSearch={() => setSearchQuery('')}
          isSticky={isSearchSticky}
          showAdvancedToggle={!isSearchSticky}
          onToggleAdvanced={() => setShowAdvanced(p => !p)}
          isAdvancedOpen={showAdvanced}
        />

        {showAdvanced && !isSearchSticky && (
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={CATEGORIES}
          />
        )}

        {isSearchSticky && <div className="h-14" aria-hidden="true" />}

        <QuestionList
          questions={questions}
          loading={loading}
          onQuestionClick={handleQuestionClick}
          onShareQuestion={handleShareQuestion}
        />

      </div>
    </div>
  )
}

export default DiscoverBody