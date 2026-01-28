import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"
import Notification from "../components/Notification"
import AlartBox from "../components/AlartBox"
import Icon from '../components/common/Icon'
import MobileView from "../components/History/MobileView"
import DesktopView from "../components/History/DesktopView"

function HistoryBody() {
  const [activeView, setActiveView] = useState('answered') // 'answered' or 'created'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Sample data
  const answeredQuestions = [
    { id: 1, title: 'How to solve quadratic equations?', date: '2 hours ago', accuracy: '95%' },
    { id: 2, title: 'Chemistry: Balancing equations', date: 'Yesterday', accuracy: '88%' },
    { id: 3, title: 'Physics: Newton\'s laws', date: '3 days ago', accuracy: '92%' },
    { id: 4, title: 'JavaScript async/await', date: '1 week ago', accuracy: '96%' },
  ]

  const createdQuestions = [
    { id: 1, title: 'Algebra test for beginners', date: 'Today', responses: 24 },
    { id: 2, title: 'Chemistry mid-term review', date: '2 days ago', responses: 42 },
    { id: 3, title: 'Physics motion problems', date: '5 days ago', responses: 18 },
    { id: 4, title: 'Web development quiz', date: '2 weeks ago', responses: 56 },
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          History
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Track your questions and answers
        </p>
      </div>

      {/* Mobile Dropdown (hidden on medium screens and up) */}
      <div className="md:hidden mb-6">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Icon 
                name={activeView === 'answered' ? 'message-square' : 'file-text'} 
                className="text-blue-600 dark:text-blue-400"
              />
              <span className="font-medium">
                {activeView === 'answered' ? 'Answered Questions' : 'Created Questions'}
              </span>
            </div>
            <Icon 
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} 
              className="text-slate-500 dark:text-slate-400 transition-transform"
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl shadow-lg z-10">
              <button
                onClick={() => {
                  setActiveView('answered')
                  setIsDropdownOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 ${activeView === 'answered' ? 'bg-blue-50 dark:bg-blue-900/20' : ''} hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors rounded-t-xl`}
              >
                <Icon name="message-square" />
                <span>Answered Questions</span>
              </button>
              <div className="border-t border-slate-200 dark:border-slate-700"></div>
              <button
                onClick={() => {
                  setActiveView('created')
                  setIsDropdownOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 ${activeView === 'created' ? 'bg-blue-50 dark:bg-blue-900/20' : ''} hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors rounded-b-xl`}
              >
                <Icon name="file-text" />
                <span>Created Questions</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <DesktopView 
        activeView={activeView}
        setActiveView={setActiveView}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}/>
      {/* Mobile Single Column View */}
      <MobileView 
        activeView={activeView}
        setActiveView={setActiveView}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen} />
    </div>
  )
}

function History() {
    const { user, isCreatingQues, darkMode, setDarkMode } = useAuth()
    const [notification, setNotification] = useState({
      message: "",
      type : "",
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
          onClose={() => setNotification({message : "", type: ""})}/>

        <AlartBox
          message={alart.message}
          okWord={alart.okWord}
          glowType={alart.glowType}
          onClose={() => setAlart({ message: "", okWord: "", glowType: "normal"})}
          okFunction={() => console.log("positive action")}/>

        <div className={`min-h-[calc(100vh - 46)] flex ${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className={ `flex-1 lg:ms-64 pb-11.5 lg:pb-0 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900`}>
            <HistoryBody />
            </main>
            <BottomNav />
            
        </div>
        </div>
      </>
    );
    }

export default History