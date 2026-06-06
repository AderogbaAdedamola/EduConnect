import { useState } from 'react'
import Icon from '../common/Icon'

const TABS = [
  { id: 'overview',  icon: 'layout-grid',    label: 'Overview' },
  { id: 'ai',        icon: 'sparkles',        label: 'AI Assistant' },
  { id: 'messages',  icon: 'message-square',  label: 'Live Messaging' },
]

// Mock chat history — will come from backend later
const MOCK_HISTORY = [
  { id: 1, label: 'Python quiz – 10 questions',  time: '2h ago' },
  { id: 2, label: 'Biology – Cell structure',    time: 'Yesterday' },
  { id: 3, label: 'JavaScript interview prep',   time: '3d ago' },
  { id: 4, label: 'World War II causes quiz',    time: '1w ago' },
]

export default function WorkspaceSidebar({ activeTabId, onTabChange }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className={`
        hidden lg:flex flex-col h-full shrink-0
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        transition-[width] duration-300 ease-in-out overflow-hidden
        ${expanded ? 'w-60' : 'w-16'}
      `}
    >
      {/* Top — Toggle */}
      <div className={`flex items-center border-b border-slate-200 dark:border-slate-800 py-4 shrink-0 ${expanded ? 'justify-between px-4' : 'justify-center px-0'}`}>
        {expanded && (
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Workspace
          </span>
        )}
        <button
          onClick={() => setExpanded(v => !v)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={expanded ? 'Collapse workspace sidebar' : 'Expand workspace sidebar'}
        >
          <Icon name={expanded ? 'panel-left-close' : 'panel-left-open'} />
        </button>
      </div>

      {/* Main Tab Nav */}
      <nav className="px-2 py-3 space-y-1">
        {TABS.map(tab => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              title={!expanded ? tab.label : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${expanded ? '' : 'justify-center'}
                ${isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 dark:shadow-blue-900'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
                }
              `}
            >
              <Icon name={tab.icon} className="shrink-0 w-4 h-4" />
              {expanded && <span className="truncate">{tab.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-slate-200 dark:border-slate-800 my-1" />

      {/* History section — only when expanded */}
      {expanded && (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 mb-2">
            AI Chat History
          </p>
          <div className="space-y-0.5">
            {MOCK_HISTORY.map(item => (
              <button
                key={item.id}
                className="w-full text-left px-3 py-2 rounded-xl text-sm transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white group"
              >
                <p className="truncate text-[13px] font-medium leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.label}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{item.time}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed: history icon button */}
      {!expanded && (
        <div className="flex-1 flex flex-col items-center pt-2 gap-1">
          <button
            title="Chat History"
            className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Icon name="history" className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom: New Chat button */}
      <div className={`shrink-0 p-3 border-t border-slate-200 dark:border-slate-800`}>
        <button
          onClick={() => onTabChange('ai')}
          title={!expanded ? 'New AI Chat' : undefined}
          className={`
            w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
            text-white transition-all shadow-sm
            ${expanded ? '' : 'justify-center'}
          `}
        >
          <Icon name="plus" className="shrink-0 w-4 h-4" />
          {expanded && 'New AI Chat'}
        </button>
      </div>
    </aside>
  )
}
