import { memo } from 'react'
import Icon from '../common/Icon'

const CATEGORY_STYLES = {
  'Mathematics':  'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'Chemistry':    'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'Physics':      'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  'Programming':  'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  'History':      'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  'Biology':      'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  'Business':     'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const diffHours = Math.floor((Date.now() - new Date(timestamp)) / 3_600_000)
  if (diffHours < 1)  return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

const QuestionItem = memo(({ question, onClick, onShare }) => {
  if (!question) return null

  // Safe locals — guards against undefined fields in mock data
  const categoryStyle  = CATEGORY_STYLES[question.category] ?? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
  const answerCount    = typeof question.answerCount === 'number' ? question.answerCount : 0
  const creatorName    = question.creator?.username ?? 'unknown'
  const createdAt      = question.createdAt ?? null
  const responseType   = typeof question.responseType === 'string' ? question.responseType : 'text'

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View question: ${question.title ?? 'Untitled'}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Top row — badges + share */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Category badge */}
          {question.category && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold ${categoryStyle}`}>
              {question.category}
            </span>
          )}

          {/* AI badge */}
          {question.aiEnabled && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              <Icon name="sparkles" aria-hidden="true" className="text-xs" />
              AI
            </span>
          )}

        </div>

        {/* Share button */}
        <button
          onClick={(e) => { e.stopPropagation(); onShare(question.id) }}
          aria-label="Copy share link"
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
        >
          <Icon name="share-2" aria-hidden="true" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug mb-1.5 line-clamp-2">
        {question.title ?? 'Untitled question'}
      </h3>

      {/* Content preview */}
      {question.content && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {question.content}
        </p>
      )}

      {/* Bottom row — meta + answer button */}
      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 min-w-0">
          <span className="flex items-center gap-1 truncate">
            <Icon name="user" aria-hidden="true" className="shrink-0" />
            <span className="truncate">@{creatorName}</span>
          </span>
          {createdAt && (
            <span className="shrink-0">{formatTime(createdAt)}</span>
          )}
          <span className="flex items-center gap-1 shrink-0">
            <Icon name="message-square" aria-hidden="true" />
            {answerCount}
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onClick() }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Icon name="pencil" aria-hidden="true" />
          <span className="hidden sm:inline">Answer</span>
        </button>
      </div>
    </div>
  )
})

QuestionItem.displayName = 'QuestionItem'
export default QuestionItem