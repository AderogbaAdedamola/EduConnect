import { useEffect } from "react"
import LogIn from "./pages/LogIn"
import { Routes, Route, Link, BrowserRouter ,Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider, useAuth } from "./context/AuthContext"
import ForgetPassword from "./pages/ForgetPassword"
import CreateQuestion from "./pages/CreateQuestion"
import TestCreate from "./pages/TestCreate"



function AppContent() {
  // const { accessToken, setAccessToken, clearAuth } = useAuth()

  // useEffect(() => {
  //   attachInterceptors(() => accessToken, setAccessToken, clearAuth);
  // }, [accessToken, setAccessToken, clearAuth]);
  return (
      // <Routes>
      //     <Route path="/create-question"element={<CreateQuestion />} />
      // </Routes>
      <Routes>
        <Route path="/"element={<LandingPage />} />
        <Route path="/logIn"element={<LogIn />} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
            } />
        <Route path="/create-question"element={
          <ProtectedRoute>
            <CreateQuestion />
          </ProtectedRoute>
          } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

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
