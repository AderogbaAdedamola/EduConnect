// src/components/Discover/SearchFilters.jsx
import { memo } from 'react'

const SearchFilters = memo(({ filters, onFilterChange, categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          Category
        </label>
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          AI Feedback
        </label>
        <select 
          value={filters.aiEnabled}
          onChange={(e) => onFilterChange('aiEnabled', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
        >
          <option value="all">All</option>
          <option value="yes">With AI</option>
          <option value="no">Without AI</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          Response Type
        </label>
        <select 
          value={filters.responseType}
          onChange={(e) => onFilterChange('responseType', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
        >
          <option value="all">Any</option>
          <option value="text">Text Only</option>
          <option value="image">Image Only</option>
          <option value="both">Text & Image</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          Sort By
        </label>
        <select 
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most-answers">Most Answers</option>
          <option value="least-answers">Least Answers</option>
        </select>
      </div>
    </div>
  )
})

SearchFilters.displayName = 'SearchFilters'
export default SearchFilters