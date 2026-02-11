// src/components/Discover/URLInput.jsx
import { memo } from 'react'

const URLInput = memo(({ 
  directUrl, 
  onUrlChange, 
  onSubmit, 
  visible 
}) => {
  return (
    <div 
      className={`mb-4 transition-all duration-300 ease-out overflow-hidden ${
        visible 
          ? 'opacity-100 max-h-20' 
          : 'opacity-0 max-h-0'
      }`}
      style={{
        transitionProperty: 'opacity, max-height',
        willChange: 'opacity, max-height'
      }}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          value={directUrl}
          onChange={onUrlChange}
          placeholder="Paste question URL here"
          className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white text-sm"
        />
        <button
          onClick={onSubmit}
          disabled={!directUrl.trim()}
          className="sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
        >
          Go to Question
        </button>
      </div>
    </div>
  )
})

URLInput.displayName = 'URLInput'
export default URLInput