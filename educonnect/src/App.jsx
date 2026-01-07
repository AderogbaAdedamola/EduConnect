import { useEffect } from "react"
import LogIn from "./pages/LogIn"
import { Routes, Route, Link, BrowserRouter ,Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";


function App() {
  useEffect(() => {
    if (false) {
      localStorage.removeItem("token");
      navigate("/LogIn");
      return
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/"element={<LandingPage />} />
       <Route path="/LogIn"element={<LogIn />} />
       <Route path="/SignUp" element={<SignUp/>} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
