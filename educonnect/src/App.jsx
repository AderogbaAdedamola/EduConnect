import { useEffect } from "react"
import LogIn from "./pages/LogIn"
import { Routes, Route, Link, BrowserRouter ,Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";
import { attachInterceptors } from "./api/port"


function App() {
  useEffect(() => {
    attachInterceptors(() => accessToken, setAccessToken, clearAuth);
  }, [accessToken]);
  return (
    <BrowserRouter>
       <AuthProvider>
      <Routes>
       <Route path="/"element={<LandingPage />} />
       <Route path="/LogIn"element={<LogIn />} />
       <Route path="/SignUp" element={<SignUp/>} />
           <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          } />
       
       <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
       </AuthProvider>
   </BrowserRouter>
  )
}

export default App
