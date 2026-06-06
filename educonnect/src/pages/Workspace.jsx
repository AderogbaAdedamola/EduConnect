import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSidebarWidth } from '../hooks/useSidebarWidth'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Layout/Sidebar'
import BottomNav from '../components/Layout/BottomNav'
import Icon from '../components/common/Icon'

// Workspace components
import WorkspaceSidebar from '../components/Workspace/WorkspaceSidebar'
import AIAssistantTab from '../components/Workspace/AIAssistantTab'
import OverviewTab from '../components/Workspace/OverviewTab'
import MessagingTab from '../components/Workspace/MessagingTab'

const TAB_META = {
  ai:       { label: 'AI Assistant',    icon: 'sparkles',       desc: 'Generate and manage question sets with AI' },
  overview: { label: 'Overview',        icon: 'layout-grid',    desc: 'Monitor responses and question set performance' },
  messages: { label: 'Live Messaging',  icon: 'message-square', desc: 'Watch AI conversations and jump in when needed' },
}

// Mobile bottom tab bar (replaces top tabs on mobile)
function MobileTabBar({ activeTabId, onTabChange }) {
  const tabs = Object.entries(TAB_META)
  return (
    <div className="lg:hidden shrink-0 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 overflow-x-auto custom-scrollbar">
      {tabs.map(([id, meta]) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTabId === id
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Icon name={meta.icon} className="w-4 h-4" />
          {meta.label}
        </button>
      ))}
    </div>
  )
}

export default function Workspace() {
  const { theme } = useAuth()
  const sidebarMargin = useSidebarWidth()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTabId = searchParams.get('tab') || 'overview'

  const handleTabChange = (id) => {
    setSearchParams({ tab: id })
  }

  const meta = TAB_META[activeTabId] ?? TAB_META.overview

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* App-level Sidebar (Desktop) */}
        <Sidebar />

        {/* Main area — offset for App sidebar */}
        <div className={`flex-1 ${sidebarMargin} flex flex-col h-screen overflow-hidden`}>
          
          {/* Top header bar */}
          <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {meta.label}
              </h1>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">
                {meta.desc}
              </p>
            </div>
            {/* Right: badge showing active tab */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-xl">
                <Icon name={meta.icon} className="w-3.5 h-3.5" />
                Workspace
              </span>
            </div>
          </div>

          {/* Mobile tab switcher */}
          <MobileTabBar activeTabId={activeTabId} onTabChange={handleTabChange} />

          {/* Body: Workspace sidebar + tab content side by side */}
          <div className="flex-1 flex overflow-hidden bg-slate-50 dark:bg-gray-950">

            {/* Workspace internal sidebar */}
            <WorkspaceSidebar
              activeTabId={activeTabId}
              onTabChange={handleTabChange}
            />

            {/* Tab content panel */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeTabId === 'ai' && <AIAssistantTab />}
              {activeTabId === 'overview' && <OverviewTab />}
              {activeTabId === 'messages' && <MessagingTab />}
            </div>
          </div>

        </div>

        {/* Mobile bottom nav */}
        <BottomNav />
      </div>
    </div>
  )
}