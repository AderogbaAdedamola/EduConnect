import { useState, useEffect } from 'react'

const STORAGE_KEY = 'sidebar_collapsed'

/**
 * Returns the correct left-margin class for the main content area
 * based on the current sidebar collapsed state.
 *
 * Usage:
 *   const sidebarMargin = useSidebarWidth()
 *   <main className={`flex-1 ${sidebarMargin} ...`}>
 */
export function useSidebarWidth() {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' }
    catch { return false }
  })

  useEffect(() => {
    // Listen for storage changes so all pages stay in sync
    const handler = (e) => {
      if (e.key === STORAGE_KEY) {
        setCollapsed(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', handler)

    // Also poll on a short interval to catch same-tab changes
    // (localStorage events don't fire in the same tab)
    const interval = setInterval(() => {
      try {
        const val = localStorage.getItem(STORAGE_KEY) === 'true'
        setCollapsed(prev => prev !== val ? val : prev)
      } catch {}
    }, 100)

    return () => {
      window.removeEventListener('storage', handler)
      clearInterval(interval)
    }
  }, [])

  return collapsed ? 'lg:ms-[68px]' : 'lg:ms-64'
}