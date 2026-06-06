import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSidebarWidth } from '../hooks/useSidebarWidth'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Layout/Sidebar'
import BottomNav from '../components/Layout/BottomNav'
import Icon from '../components/common/Icon'

// Tabs
import AIAssistantTab from '../components/Workspace/AIAssistantTab'
// import OverviewTab from '../components/Workspace/OverviewTab'
// import MessagingTab from '../components/Workspace/MessagingTab'

const TABS = [
  { id: 'ai', label: 'AI Assistant', icon: 'sparkles' },
  { id: 'overview', label: 'Overview', icon: 'bar-chart' },
  { id: 'messages', label: 'Live Messaging', icon: 'message-square' }
]

export default function Workspace() {
  const { theme } = useAuth()
  const sidebarMargin = useSidebarWidth()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Default to overview if no tab specified
  const activeTabId = searchParams.get('tab') || 'overview'

  const handleTabChange = (id) => {
    setSearchParams({ tab: id })
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col lg:flex-row w-full">
        <Sidebar />

        <main className={`flex-1 ${sidebarMargin} flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 pb-20 lg:pb-0`}>
          
          {/* Header & Tabs */}
          <div className="shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 pt-4 lg:pt-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Workspace</h1>
              
              <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 font-medium text-sm transition-colors border-b-2 whitespace-nowrap
                      ${activeTabId === tab.id 
                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50 rounded-t-lg'
                      }
                    `}
                  >
                    <Icon name={tab.icon} className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto relative flex flex-col">
            {activeTabId === 'ai' && <AIAssistantTab />}
            {activeTabId === 'overview' && (
               <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
                   <Icon name="bar-chart" className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Responses Overview</h2>
                 <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                   This area will show analytics, respondent scores, and completion stats. Coming soon.
                 </p>
               </div>
            )}
            {activeTabId === 'messages' && (
               <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4">
                   <Icon name="message-square" className="text-green-600 dark:text-green-400 w-8 h-8" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Live Messaging Center</h2>
                 <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                   Monitor respondents chatting with the AI in real-time, and take over the conversation directly when needed.
                 </p>
               </div>
            )}
          </div>

        </main>
        
        <BottomNav />
      </div>
    </div>
  )
}