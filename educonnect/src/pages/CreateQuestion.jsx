import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/QuickHeader"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"
import Notification from "../components/Notification"
import AlartBox from "../components/AlartBox"
import CreateQuestionMain from '../components/CreateQuestion/CreateQuestionMain'
import { useSidebarWidth } from "../hooks/useSidebarWidth"
import { useNavigate } from 'react-router-dom'


function CreateQuestionBody() {
    const { isCreatingQues, setIsCreatingQues } = useAuth()
    const navigate = useNavigate()
    const [createManually, setCreateManually] = useState(false)
    const [createByAI, setCreateByAI] = useState(false)
    const [resumeDraft, setResumeDraft] = useState(false)
    const [draft, setDraft] = useState(null)

    // Load draft on mount
    useEffect(() => {
      const savedDraft = localStorage.getItem('educonnect_manual_draft')
      if (savedDraft) {
        try {
          setDraft(JSON.parse(savedDraft))
        } catch (e) {
          console.error(e)
        }
      }
    }, [isCreatingQues]) // Re-check when returning from creating

  if (isCreatingQues && createManually) {
    return (
    <CreateQuestionMain 
     setCreateManually={setCreateManually}
     setCreateByAI={setCreateByAI}
     resumeDraft={resumeDraft} />
  )
  }
  if (isCreatingQues && createByAI) {
    return <div>Create By Ai page</div>
  }

  return (
    <div className="p-6">
      {/* Two main boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">Create Question</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Manually create questions with full control
          </p>
          <button 
            onClick={() =>{ 
              setResumeDraft(false) // Clear draft flag to start fresh
              setIsCreatingQues(true)
              setCreateManually(true)}
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold"
          >
            Start Creating
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">Create with AI</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Generate questions using AI assistance
          </p>
          <button 
            onClick={() => navigate('/workspace?tab=ai')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 rounded-lg font-semibold"
          >
            Use AI Assistant
          </button>
        </div>
      </div>

      {/* Drafts Section */}
      {draft && (
        <div className="mt-8 animate-fade-in-up">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </span>
            Saved Drafts
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {draft.title || "Untitled Question Set"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {draft.questions?.length || 0} questions • Last saved: {new Date(draft.lastSavedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  if (window.confirm("Are you sure you want to discard this draft?")) {
                    localStorage.removeItem('educonnect_manual_draft')
                    setDraft(null)
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => {
                  setResumeDraft(true)
                  setCreateManually(true)
                  setIsCreatingQues(true)
                }}
                className="px-4 py-2 text-sm font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:hover:bg-blue-900/60 rounded-lg transition-colors"
              >
                Resume Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CreateQuestion() {
    const { user, isCreatingQues, theme } = useAuth()
    const [notification, setNotification] = useState({
      message: "",
      type : "",
    })
    const [alart, setAlart] = useState({
      message: "",
      okWord: "",
      glowType: "",
    })
    const sidebarMargin = useSidebarWidth()

    

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

        <div className={`min-h-screen flex ${theme === "dark" ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className={ `flex-1 ${sidebarMargin} overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900`}>
            {!isCreatingQues && <Header />}
            <CreateQuestionBody />
            </main>
            {!isCreatingQues && <BottomNav />}
            
        </div>
        </div>
      </>
    );
    }

export default CreateQuestion