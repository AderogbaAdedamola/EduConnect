import { useEffect } from "react"
import LogIn from "./pages/LogIn"
import { Routes, Route, Link, BrowserRouter ,Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider, useAuth } from "./context/AuthContext"



function AppContent() {
  // const { accessToken, setAccessToken, clearAuth } = useAuth()

  // useEffect(() => {
  //   attachInterceptors(() => accessToken, setAccessToken, clearAuth);
  // }, [accessToken, setAccessToken, clearAuth]);
  return (
     <Routes>
        <Route path="/dashboard" element={<Dashboard />}> </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
     </Routes> 
      // <Routes>
      //   <Route path="/"element={<LandingPage />} />
      //   <Route path="/LogIn"element={<LogIn />} />
      //   <Route path="/SignUp" element={<SignUp/>} />
      //       <Route path="/dashboard" element={
      //           <ProtectedRoute>
      //             <Dashboard />
      //           </ProtectedRoute>
      //       } />
        
      //   <Route path="*" element={<Navigate to="/" replace />} />
      // </Routes>
  )
}
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
