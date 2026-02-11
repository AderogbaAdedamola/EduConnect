// src/components/Discover/QuestionItem.jsx
import { memo } from 'react'
import Icon from '../common/Icon'

const QuestionItem = memo(({ question, onClick, onShare }) => {
  const formatTime = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 cursor-pointer active:bg-slate-50 dark:active:bg-slate-700 transition-colors"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-900 dark:text-white truncate mb-1">
            {question.title}
          </h3>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Icon name="user" className="text-xs" />
              @{question.creator.username}
            </span>
            <span>{formatTime(question.createdAt)}</span>
            <span className="flex items-center gap-1">
              <Icon name="message-square" className="text-xs" />
              {question.answerCount} answers
            </span>
            {question.aiEnabled && (
              <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400">
                <Icon name="bot" className="text-xs" />
                AI
              </span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onShare(question.id)
          }}
          className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
          title="Share question"
        >
          <Icon name="share-2" />
        </button>
      </div>
    </div>
  )
})

QuestionItem.displayName = 'QuestionItem'
export default QuestionItem