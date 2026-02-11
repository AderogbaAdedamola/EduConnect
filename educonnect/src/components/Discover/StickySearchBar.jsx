// src/components/Discover/StickySearchBar.jsx
import { memo } from 'react'
import Icon from '../common/Icon'

const StickySearchBar = memo(({ 
  searchQuery, 
  onSearchChange, 
  onClearSearch,
  isSticky,
  showAdvancedToggle,
  onToggleAdvanced,
  isAdvancedOpen
}) => {
  return (
    <div 
      className={`sticky top-0 z-10 bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 backdrop-blur-sm transition-all duration-200 ${
        isSticky 
          ? 'pt-4 pb-3 border-b border-slate-200 dark:border-slate-700 shadow-sm -mx-4 md:-mx-6 px-4 md:px-6' 
          : 'pb-4'
      }`}
      style={{
        willChange: 'transform'
      }}
    >
      {/* Search Bar */}
      <div className="relative">
        <Icon 
          name="search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search questions..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white text-sm"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <Icon name="x" />
          </button>
        )}
      </div>

      {/* Advanced Filters Toggle */}
      {showAdvancedToggle && !isSticky && (
        <div className="mt-3 transition-opacity duration-200">
          <button
            onClick={onToggleAdvanced}
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium"
          >
            <Icon name={isAdvancedOpen ? 'chevron-up' : 'chevron-down'} />
            <span>Advanced Filters</span>
          </button>
        </div>
      )}
    </div>
  )
})

StickySearchBar.displayName = 'StickySearchBar'
export default StickySearchBar