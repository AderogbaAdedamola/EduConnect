import { memo } from 'react'
import Icon from '../common/Icon'

const URLInput = memo(({ directUrl, onUrlChange, onSubmit, visible }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSubmit()
  }

  return (
    <div
      aria-hidden={!visible}
      className={`transition-all duration-300 ease-out overflow-hidden ${
        visible ? 'opacity-100 max-h-24 mb-2' : 'opacity-0 max-h-0 mb-0'
      }`}
    >
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Icon
            name="link"
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="url"
            value={directUrl}
            onChange={onUrlChange}
            onKeyDown={handleKeyDown}
            placeholder="Paste a question link to go directly..."
            aria-label="Direct question URL"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={!directUrl.trim()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
        >
          <Icon name="arrow-right" aria-hidden="true" />
          <span>Go</span>
        </button>
      </div>
    </div>
  )
})

URLInput.displayName = 'URLInput'

export default URLInput