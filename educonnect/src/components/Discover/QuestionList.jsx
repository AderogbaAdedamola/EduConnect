// src/components/Discover/QuestionList.jsx
import { memo } from 'react'
import Icon from '../common/Icon'
import QuestionItem from './QuestionItem'

const QuestionList = memo(({ 
  questions, 
  loading, 
  onQuestionClick,
  onShareQuestion 
}) => {
  // Loading Skeleton
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="flex items-center gap-3">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                </div>
              </div>
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty State
  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="search" className="text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No questions found
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Try adjusting your filters
        </p>
      </div>
    )
  }

  // Questions List
  return (
    <>
      <div className="space-y-3">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onClick={() => onQuestionClick(question.id)}
            onShare={onShareQuestion}
          />
        ))}
      </div>

      {/* Load More Button */}
      {questions.length > 0 && (
        <div className="mt-6 text-center">
          <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Load More
          </button>
        </div>
      )}
    </>
  )
})

QuestionList.displayName = 'QuestionList'
export default QuestionList