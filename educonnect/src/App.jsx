import { useEffect } from "react"
import LogIn from "./pages/LogIn"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LandingPage from "./pages/LandingPage"


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/"element={<LandingPage />} />
       <Route path="/LogIn"element={<LogIn />} />
       <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
