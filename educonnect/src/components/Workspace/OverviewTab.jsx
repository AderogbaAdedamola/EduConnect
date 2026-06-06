import Icon from '../common/Icon'

// Mock question sets — replace with API data
const QUESTION_SETS = [
  { id: 1, title: 'Python Fundamentals Quiz', responses: 24, completion: 87, status: 'active' },
  { id: 2, title: 'Biology – Cell Structure', responses: 12, completion: 65, status: 'active' },
  { id: 3, title: 'JavaScript Interview Prep', responses: 5, completion: 40, status: 'draft' },
]

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex items-start gap-4 shadow-sm">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

function QuestionSetRow({ set }) {
  const statusColors = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    draft: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
        <Icon name="file-text" className="text-blue-600 dark:text-blue-400 w-5 h-5" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
          {set.title}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          {/* Progress bar */}
          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden max-w-[120px]">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${set.completion}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">{set.completion}% complete</span>
        </div>
      </div>

      {/* Responses */}
      <div className="text-center shrink-0 hidden sm:block">
        <p className="text-base font-bold text-slate-900 dark:text-white">{set.responses}</p>
        <p className="text-xs text-slate-400">responses</p>
      </div>

      {/* Status */}
      <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[set.status]}`}>
        {set.status}
      </span>

      {/* Action */}
      <button className="shrink-0 p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
        <Icon name="external-link" className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function OverviewTab() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* Stats Row */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Your Activity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon="file-text" label="Question Sets" value="3" color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
            <StatCard icon="users" label="Total Responses" value="41" color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" />
            <StatCard icon="trending-up" label="Avg. Completion" color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" value="64%" />
          </div>
        </div>

        {/* Question Sets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Question Sets</h2>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              <Icon name="plus" className="w-4 h-4" />
              Create New
            </button>
          </div>
          <div className="space-y-3">
            {QUESTION_SETS.map(set => (
              <QuestionSetRow key={set.id} set={set} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
