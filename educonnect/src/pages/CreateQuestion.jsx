import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"
import Notification from "../components/Notification"
import AlartBox from "../components/AlartBox"
import CreateQuestionMain from '../components/CreateQuestion/CreateQuestionMain'

function CreateQuestionBody() {
    const { isCreatingQues, setIsCreatingQues } = useAuth()
    const [createManually, setCreateManually] = useState(false)
    const [createByAI, setCreateByAI] = useState(false)

  if (isCreatingQues && createManually) {
    return (
    <CreateQuestionMain 
     setCreateManually={setCreateManually}
     setCreateByAI={setCreateByAI}/>
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
            onClick={() =>{ 
              setIsCreatingQues(true)
              setCreateByAI(true)}
            }
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 rounded-lg font-semibold"
          >
            Use AI Assistant
          </button>
        </div>
      </div>
    </div>
  )
}

function CreateQuestion() {
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

        <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className={ `flex-1 lg:ms-64 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900`}>
            {!isCreatingQues && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}
            <CreateQuestionBody />
            </main>
            {!isCreatingQues && <BottomNav />}
            
        </div>
        </div>
      </>
    );
    }

export default CreateQuestion