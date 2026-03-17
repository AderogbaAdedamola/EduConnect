import { memo } from 'react'
import Icon from '../common/Icon'

const StickySearchBar = memo(({
  searchQuery,
  onSearchChange,
  onClearSearch,
  isSticky,
  showAdvancedToggle,
  onToggleAdvanced,
  isAdvancedOpen,
}) => {
  return (
    <div
      className={`sticky top-0 z-10 transition-all duration-200 ${
        isSticky
          ? '-mx-4 md:-mx-6 px-4 md:px-6 pt-3 pb-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm'
          : 'pb-1'
      }`}
    >
      {/* Search input */}
      <div className="relative">
        <Icon
          name="search"
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search questions, topics, creators..."
          aria-label="Search questions"
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            <Icon name="x" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Advanced filter toggle — only when not sticky */}
      {showAdvancedToggle && !isSticky && (
        <button
          type="button"
          onClick={onToggleAdvanced}
          aria-expanded={isAdvancedOpen}
          className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-0.5"
        >
          <Icon name={isAdvancedOpen ? 'chevron-up' : 'sliders-horizontal'} aria-hidden="true" />
          {isAdvancedOpen ? 'Hide filters' : 'Filters'}
        </button>
      )}
    </div>
  )
})

StickySearchBar.displayName = 'StickySearchBar'
export default StickySearchBar