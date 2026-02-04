// src/pages/DiscoverQuestions.jsx
import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"
import Notification from "../components/Notification"
import AlartBox from "../components/AlartBox"
import Icon from '../components/common/Icon'
import QuestionCard from '../components/Discover/QuestionCard'
import SearchFilters from '../components/Discover/SearchFilters'

function DiscoverBody() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'trending', 'following', 'ai-enabled'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [directUrl, setDirectUrl] = useState('')

  // Fetch questions on component mount and filter changes
  useEffect(() => {
    fetchQuestions()
  }, [activeFilter, selectedCategory])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      // In production, this would be an API call
      const mockQuestions = [
        {
          id: 1,
          title: 'Solve the quadratic equation: x² - 5x + 6 = 0',
          content: 'Find the roots and explain your steps',
          category: 'Mathematics',
          creator: {
            username: 'math_expert',
            avatar: null
          },
          createdAt: '2024-01-15T10:30:00Z',
          answerCount: 24,
          aiEnabled: true,
          responseType: 'text', // 'text', 'image', 'both'
          difficulty: 'intermediate',
          tags: ['algebra', 'quadratic', 'equations']
        },
        {
          id: 2,
          title: 'Explain the concept of chemical bonding',
          content: 'Compare ionic, covalent, and metallic bonds with examples',
          category: 'Chemistry',
          creator: {
            username: 'chem_prof',
            avatar: null
          },
          createdAt: '2024-01-14T14:20:00Z',
          answerCount: 15,
          aiEnabled: true,
          responseType: 'both',
          difficulty: 'beginner',
          tags: ['chemical bonding', 'ionic', 'covalent']
        },
        {
          id: 3,
          title: 'JavaScript closure concept with practical example',
          content: 'Explain closures in JavaScript and provide a real-world use case',
          category: 'Programming',
          creator: {
            username: 'js_dev',
            avatar: null
          },
          createdAt: '2024-01-13T09:15:00Z',
          answerCount: 8,
          aiEnabled: false,
          responseType: 'text',
          difficulty: 'intermediate',
          tags: ['javascript', 'closures', 'web-dev']
        },
        {
          id: 4,
          title: 'Newton\'s laws of motion application',
          content: 'Solve this physics problem involving force and acceleration',
          category: 'Physics',
          creator: {
            username: 'physics_guru',
            avatar: null
          },
          createdAt: '2024-01-12T16:45:00Z',
          answerCount: 32,
          aiEnabled: true,
          responseType: 'image',
          difficulty: 'advanced',
          tags: ['physics', 'newton', 'motion']
        },
        {
          id: 5,
          title: 'World War II causes and consequences',
          content: 'Analyze the main causes and global impact of WWII',
          category: 'History',
          creator: {
            username: 'history_buff',
            avatar: null
          },
          createdAt: '2024-01-11T11:20:00Z',
          answerCount: 18,
          aiEnabled: true,
          responseType: 'text',
          difficulty: 'intermediate',
          tags: ['history', 'wwii', '20th-century']
        }
      ]
      
      // Apply filters
      let filtered = mockQuestions
      
      if (activeFilter === 'trending') {
        filtered = filtered.sort((a, b) => b.answerCount - a.answerCount)
      } else if (activeFilter === 'ai-enabled') {
        filtered = filtered.filter(q => q.aiEnabled)
      }
      
      if (selectedCategory) {
        filtered = filtered.filter(q => q.category === selectedCategory)
      }
      
      setQuestions(filtered)
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    // In production, this would trigger an API search
    console.log('Searching for:', query)
  }

  const handleDirectUrlSubmit = () => {
    if (directUrl.trim()) {
      // Extract question ID from URL and navigate
      console.log('Navigating to direct URL:', directUrl)
      // navigate(`/answer/${questionId}`)
    }
  }

  const categories = ['Mathematics', 'Chemistry', 'Physics', 'Programming', 'History', 'Biology', 'Business']

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Discover Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Answer questions, learn from AI feedback, and help others
        </p>
      </div>

      {/* Quick URL Input */}
      <div className="mb-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="link" className="text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Have a direct link?
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={directUrl}
            onChange={(e) => setDirectUrl(e.target.value)}
            placeholder="Paste EduConnect question URL here"
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
          />
          <button
            onClick={handleDirectUrlSubmit}
            disabled={!directUrl.trim()}
            className="sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Go to Question
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <SearchFilters
        onSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Main Content */}
      <div className="mt-6">
        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onAnswerClick={() => console.log('Answer clicked:', question.id)}
                  onSaveClick={() => console.log('Save clicked:', question.id)}
                  onShareClick={() => console.log('Share clicked:', question.id)}
                />
              ))}
            </div>

            {/* Empty State */}
            {questions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="search" className="text-slate-400 dark:text-slate-500 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Try adjusting your filters or be the first to create a question!
                </p>
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Create Question
                </button>
              </div>
            )}

            {/* Load More Button */}
            {questions.length > 0 && (
              <div className="mt-8 text-center">
                <button className="px-6 py-3 border border-slate-300 dark:border-slate-600 hover:border-blue-500 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-colors">
                  Load More Questions
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Stats (Desktop only) */}
      <div className="hidden lg:block mt-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
          Community Today
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Icon name="file-text" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">New Questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Icon name="message-square" className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">5,678</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Answers Posted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Icon name="bot" className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">89%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">With AI Feedback</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Icon name="users" className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">456</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Active Creators</p>
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
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <DiscoverBody />
          </main>
          <BottomNav />
        </div>
      </div>
    </>
  )
}

export default DiscoverQuestions