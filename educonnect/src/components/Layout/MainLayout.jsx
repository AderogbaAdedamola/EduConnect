import { useState } from 'react'
import { useAuth } from "../../context/AuthContext"
import Header from "../Layout/QuickHeader"
import Sidebar from "../Layout/Sidebar"
import BottomNav from "../Layout/BottomNav"
import Notification from "../Notification"
import AlartBox from "../AlartBox"
import { Outlet } from "react-router-dom"

function MainLayout() {
    const { user, isCreatingQues, theme, setTheme } = useAuth()
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

        <div className={`min-h-screen flex ${theme === "dark" ? 'dark' : ''}`}>
        <div className="flex flex-col lg:flex-row w-full">
            <Sidebar />
            <main className={ `flex-1 lg:ms-64 overflow-y-auto custom-scrollbar bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900`}>
            {!isCreatingQues && <Header />}
            <Outlet />
            </main>
            {!isCreatingQues && <BottomNav />}
            
        </div>
        </div>
      </>
    );
    }

export default MainLayout