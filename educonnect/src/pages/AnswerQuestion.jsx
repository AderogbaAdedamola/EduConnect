// src/pages/DiscoverQuestions.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"
import Notification from "../components/Notification"
import AlartBox from "../components/AlartBox"
import Icon from '../components/common/Icon'
import { mockQuestions } from '../data'

function DiscoverBody() {
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
  
  // Scroll state
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [showUrlBar, setShowUrlBar] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [filters])

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return
      
      const currentScrollY = scrollContainerRef.current.scrollTop
      const scrollThreshold = 100 // When to make search sticky
      
      // Detect scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY)
      
      // Show URL bar when scrolling down near top
      if (currentScrollY <= 50) {
        setShowUrlBar(true)
      } else if (!isScrollingUp && currentScrollY > 50) {
        setShowUrlBar(false)
      }
      
      // Make search sticky when scrolled past threshold
      setIsSearchSticky(currentScrollY > scrollThreshold)
      
      setLastScrollY(currentScrollY)
    }
    
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [lastScrollY, isScrollingUp])

  const fetchQuestions = () => {
    setLoading(true)
    setTimeout(() => {
      let filtered = [...mockQuestions]
      
      // Apply filters
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
      
      // Sort
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
  }

  const handleQuestionClick = (questionId) => {
    navigate(`/answer/${questionId}`)
  }

  const handleDirectUrlSubmit = () => {
    if (directUrl.trim()) {
      // Extract ID from URL and navigate
      const questionId = extractQuestionId(directUrl)
      if (questionId) {
        navigate(`/answer/${questionId}`)
      }
    }
  }

  const extractQuestionId = (url) => {
    const match = url.match(/\/answer\/([a-zA-Z0-9-_]+)/)
    return match ? match[1] : null
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const categories = ['all', 'Mathematics', 'Chemistry', 'Physics', 'Programming', 'History', 'Biology', 'Business']

  return (
    <div 
      ref={scrollContainerRef}
      className="h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-4 md:p-6"
    >
      <div 
        className={`mb-4 transition-all duration-300 ease-in-out ${
          showUrlBar 
            ? 'opacity-100 max-h-20' 
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={directUrl}
            onChange={(e) => setDirectUrl(e.target.value)}
            placeholder="Paste question URL here"
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white text-sm"
          />
          <button
            onClick={handleDirectUrlSubmit}
            disabled={!directUrl.trim()}
            className="sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
          >
            Go to Question
          </button>
        </div>
      </div>

      {/* Sticky Search Container */}
      <div 
        className={`sticky top-0 z-10 bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-all duration-200 ${
          isSearchSticky 
            ? 'pt-4 pb-3 border-b border-slate-200 dark:border-slate-700 -mx-4 md:-mx-6 px-4 md:px-6' 
            : 'pb-4'
        }`}
        style={{ 
          top: isSearchSticky ? '0' : 'auto',
          marginTop: isSearchSticky ? '-1rem' : '0'
        }}
      >
        {/* Search Bar */}
        <div className="relative">
          <Icon 
            name="search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white text-sm shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <Icon name="x" />
            </button>
          )}
        </div>

        {/* Advanced Filters Toggle */}
        <div className={`mt-3 transition-all duration-200 ${
          isSearchSticky ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-20 opacity-100'
        }`}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium"
          >
            <Icon name={showAdvanced ? 'chevron-up' : 'chevron-down'} />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showAdvanced 
            ? 'max-h-96 opacity-100 mb-4' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select 
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              AI Feedback
            </label>
            <select 
              value={filters.aiEnabled}
              onChange={(e) => setFilters({...filters, aiEnabled: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
            >
              <option value="all">All</option>
              <option value="yes">With AI</option>
              <option value="no">Without AI</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Response Type
            </label>
            <select 
              value={filters.responseType}
              onChange={(e) => setFilters({...filters, responseType: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
            >
              <option value="all">Any</option>
              <option value="text">Text Only</option>
              <option value="image">Image Only</option>
              <option value="both">Text & Image</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Sort By
            </label>
            <select 
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-answers">Most Answers</option>
              <option value="least-answers">Least Answers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className={`transition-all duration-300 ${
        isSearchSticky ? 'pt-16' : 'pt-0'
      }`}>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="search" className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((question) => (
              <div 
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 cursor-pointer active:bg-slate-50 dark:active:bg-slate-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 dark:text-white truncate mb-1">
                      {question.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Icon name="user" className="text-xs" />
                        @{question.creator.username}
                      </span>
                      <span>{formatTime(question.createdAt)}</span>
                      <span className="flex items-center gap-1">
                        <Icon name="message-square" className="text-xs" />
                        {question.answerCount} answers
                      </span>
                      {question.aiEnabled && (
                        <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400">
                          <Icon name="bot" className="text-xs" />
                          AI
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(`${window.location.origin}/answer/${question.id}`)
                      // Show notification
                    }}
                    className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded"
                    title="Share question"
                  >
                    <Icon name="share-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && questions.length > 0 && (
          <div className="mt-6 text-center">
            <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg text-sm">
              Load More
            </button>
          </div>
        )}

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

function DiscoverQuestions() {
  const { user, darkMode, setDarkMode } = useAuth()
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  })
  const [alart, setAlart] = useState({
    message: "",
    okWord: "",
    glowType: "",
  })

  return (
    <>
      <Notification 
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({message: "", type: ""})}
      />

      <AlartBox
        message={alart.message}
        okWord={alart.okWord}
        glowType={alart.glowType}
        onClose={() => setAlart({ message: "", okWord: "", glowType: "normal"})}
        okFunction={() => console.log("positive action")}
      />

      <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
          <Sidebar />
          <main className={`flex-1 lg:ms-64 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900`}>
            <DiscoverBody />
          </main>
          <BottomNav />
        </div>
      </div>
    </>
  )
}

export default DiscoverQuestions