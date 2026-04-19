import { useState, useEffect } from 'react'
import Icon from '../common/Icon'
import { useLocation, useNavigate } from 'react-router-dom'

const MENU_ITEMS = [
  { icon: 'layout-dashboard',    label: 'Dashboard',        path: '/dashboard' },
  { icon: 'message-square-plus', label: 'Create Question',  path: '/create-question' },
  { icon: 'sparkles',            label: 'Response',         path: '/response' },
  { icon: 'history',             label: 'History',          path: '/history' },
  { icon: 'search',              label: 'Discover',         path: '/discover-questions' },
]

const BOTTOM_ITEMS = [
  { icon: 'settings', label: 'Settings', path: '/settings' },
]

// Persist collapse state across page navigations
const STORAGE_KEY = 'sidebar_collapsed'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' }
    catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(collapsed)) }
    catch {}
  }, [collapsed])

  const isActive = (path) => location.pathname.toLowerCase().startsWith(path)

  return (
    <aside
      className={`
        hidden lg:flex fixed left-0 top-0 bottom-0 z-30 flex-col
        border-r border-slate-200 dark:border-slate-800
        bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900
        transition-[width] duration-300 ease-in-out
        ${collapsed ? 'w-[68px]' : 'w-64'}
      `}
    >
      
      <div className={`flex items-center border-b border-slate-200 dark:border-slate-800 shrink-0 ${collapsed ? 'justify-center px-0 py-5' : 'justify-between px-5 py-5'}`}>
        {/* Logo — hidden when collapsed */}
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Icon name="graduation-cap" aria-hidden="true" className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              EduConnect
            </span>
          </div>
        )}

        
        {collapsed && (
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Icon name="graduation-cap" aria-hidden="true" className="text-white" />
          </div>
        )}

        {/* Toggle button */}
        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Icon name="panel-left-close" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
          className="mx-auto mt-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Icon name="panel-left-open" aria-hidden="true" />
        </button>
      )}

      <nav
        aria-label="Main navigation"
        className="flex-1 px-2 py-4 space-y-1 overflow-hidden"
      >
        {MENU_ITEMS.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-blue-600/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
                }
              `}
            >
              
              <div className="relative shrink-0">
                <Icon name={item.icon} aria-hidden="true" />
              </div>

              {/* Label — only when expanded */}
              {!collapsed && (
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      
      <div className={`mt-auto border-t border-slate-200 dark:border-slate-800 px-2 py-3 space-y-1`}>
        {BOTTOM_ITEMS.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              title={collapsed ? item.label : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
                }
              `}
            >
              <Icon name={item.icon} aria-hidden="true" />
              {!collapsed && (
                <span className="text-sm whitespace-nowrap">{item.label}</span>
              )}
            </button>
          )
        })}

        
        <div className={`
          mt-2 rounded-2xl bg-slate-100 dark:bg-slate-800 transition-all
          ${collapsed ? 'p-2 flex justify-center' : 'p-3 flex items-center gap-3'}
        `}>
          <button
            type="button"
            aria-label="View profile"
            className="w-9 h-9 shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold border border-slate-300 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {"A"}
          </button>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Adedamola</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">@adedamola</p>
            </div>
          )}

          {!collapsed && (
            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 shrink-0"
            >
              <Icon name="log-out" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}