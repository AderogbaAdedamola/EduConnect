// src/pages/DiscoverQuestions.jsx
import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import BottomNav from "../components/Layout/BottomNav"
import Notification from "../components/Notification"
import AlartBox from "../components/AlartBox"
import DiscoverBody from "../components/Discover/DiscoverBody"

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
            {/* <Header darkMode={darkMode} setDarkMode={setDarkMode} /> */}
            <DiscoverBody />
          </main>
          <BottomNav />
        </div>
      </div>
    </>
  )
}

export default DiscoverQuestions