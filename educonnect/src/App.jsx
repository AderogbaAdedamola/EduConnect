import { useState, useEffect } from "react"

import { Routes, Route, Link, BrowserRouter ,Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"

import LandingPage from "./pages/LandingPage"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import ForgetPassword from "./pages/ForgetPassword"

import ProtectedRoute from "./components/ProtectedRoute"
import MainLayout from "./components/Layout/MainLayout"

import Dashboard from "./pages/Dashboard"
import CreateQuestion from "./pages/CreateQuestion"
import History from "./pages/History"
import AnswerQuestion from "./pages/AnswerQuestion"
import Response from "./pages/Response"




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
        <Route path="/history"element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
          } />
        <Route path="/response"element={
          <ProtectedRoute>
            <MainLayout >
              <Response />
            </MainLayout>
          </ProtectedRoute>
          } />
          <Route path="/discover-questions"element={
          <ProtectedRoute>
          
              <AnswerQuestion />
            
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
