import Icon from '../common/Icon'

export default function QuestionCard({ 
  question, 
  onAnswerClick, 
  onSaveClick, 
  onShareClick 
}) {
  const formatTime = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Mathematics': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Chemistry': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'Physics': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'Programming': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      'History': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      'Biology': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
      'Business': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
    }
    return colors[category] || 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300'
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors overflow-hidden group">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(question.category)}`}>
                {question.category}
              </span>
              {question.aiEnabled && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs font-medium flex items-center gap-1">
                  <Icon name="bot" className="text-xs" />
                  AI
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
              {question.title}
            </h3>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
          {question.content}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Icon name="user" className="text-xs" />
              @{question.creator.username}
            </span>
            <span>{formatTime(question.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Icon name="message-square" className="text-xs" />
              {question.answerCount} answers
            </span>
          </div>
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          {/* Response Type Indicator */}
          <div className="flex items-center gap-1 text-xs">
            {question.responseType === 'image' ? (
              <>
                <Icon name="image" className="text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Image Answers</span>
              </>
            ) : question.responseType === 'both' ? (
              <>
                <Icon name="type" className="text-slate-400" />
                <Icon name="image" className="text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Text & Image</span>
              </>
            ) : (
              <>
                <Icon name="type" className="text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">Text Answers</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSaveClick}
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Save question"
            >
              <Icon name="bookmark" />
            </button>
            
            <button
              onClick={onShareClick}
              className="p-2 text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              title="Share question"
            >
              <Icon name="share-2" />
            </button>
            
            <button
              onClick={onAnswerClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Icon name="edit" />
              <span className="hidden sm:inline">Answer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}