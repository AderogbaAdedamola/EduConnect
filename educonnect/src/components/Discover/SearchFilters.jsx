// src/components/Discover/SearchFilters.jsx
import { useState } from 'react'
import Icon from '../common/Icon'

export default function SearchFilters({ 
  onSearch, 
  categories, 
  selectedCategory, 
  onCategorySelect,
  activeFilter,
  onFilterChange 
}) {
  const [searchInput, setSearchInput] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim())
    }
  }

  const filters = [
    { id: 'all', label: 'All Questions', icon: 'grid' },
    { id: 'trending', label: 'Trending', icon: 'trending-up' },
    { id: 'ai-enabled', label: 'AI Feedback', icon: 'bot' },
    { id: 'following', label: 'Following', icon: 'users' },
  ]

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Icon 
          name="search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
          placeholder="Search questions by title, content, or creator..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
        />
        {searchInput && (
          <button
            onClick={() => {
              setSearchInput('')
              onSearch('')
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <Icon name="x" />
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Icon name={filter.icon} />
            <span className="text-sm font-medium">{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
        >
          <Icon name={showAdvanced ? 'chevron-up' : 'chevron-down'} />
          <span>Advanced Filters</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Response Type
              </label>
              <select className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm">
                <option>Any</option>
                <option>Text Only</option>
                <option>Image Only</option>
                <option>Text & Image</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Difficulty
              </label>
              <select className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm">
                <option>Any</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sort By
              </label>
              <select className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm">
                <option>Newest First</option>
                <option>Most Answers</option>
                <option>Trending</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}