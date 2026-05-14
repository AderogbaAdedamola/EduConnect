import React from 'react'
import { useSidebarWidth } from '../hooks/useSidebarWidth'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Layout/Sidebar'
import BottomNav from '../components/Layout/BottomNav'

/**
 * Response Management Page
 * Route: /manage/:id
 * 
 * TODO: Implement summary stats, respondent list, and message requests.
 */
export default function Response() {
  const { theme } = useAuth()
  const sidebarMargin = useSidebarWidth()

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col lg:flex-row w-full">
        <Sidebar />
        <main className={`flex-1 ${sidebarMargin} p-8 bg-slate-50 dark:bg-gray-900`}>
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Response Management</h1>
            <p className="text-slate-600 dark:text-slate-400">
              This page will show all responses for your question set. Coming soon!
            </p>
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}