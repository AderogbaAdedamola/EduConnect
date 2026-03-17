import { memo } from 'react'
import Icon from '../common/Icon'

const CATEGORIES = ['all', 'Mathematics', 'Chemistry', 'Physics', 'Programming', 'History', 'Biology', 'Business']

const AI_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'yes', label: 'With AI' },
  { value: 'no',  label: 'Without AI' },
]

const SearchFilters = memo(({ filters, onFilterChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-4">

      {/* Category — horizontal scrolling pills */}
      <div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
          Category
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {CATEGORIES.map(cat => {
            const isActive = filters.category === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange('category', cat)}
                aria-pressed={isActive}
                className={`
                  shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }
                `}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* AI Feedback — pills */}
      <div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
          AI Feedback
        </p>
        <div className="flex gap-2 flex-wrap">
          {AI_OPTIONS.map(opt => {
            const isActive = filters.aiEnabled === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onFilterChange('aiEnabled', opt.value)}
                aria-pressed={isActive}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }
                `}
              >
                {opt.value !== 'no' && <Icon name="sparkles" aria-hidden="true" className="text-xs" />}
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label htmlFor="filter-sort" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
          Sort by
        </label>
        <select
          id="filter-sort"
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="most-answers">Most answers</option>
          <option value="least-answers">Least answers</option>
        </select>
      </div>

    </div>
  )
})

SearchFilters.displayName = 'SearchFilters'
export default SearchFilters