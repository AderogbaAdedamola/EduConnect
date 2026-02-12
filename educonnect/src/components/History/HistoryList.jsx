import Icon from '../common/Icon';

const typeColors = {
  'MCQ':          'bg-blue-100   dark:bg-blue-900/30   text-blue-600   dark:text-blue-400',
  'Quiz':         'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  'Short Answer': 'bg-green-100  dark:bg-green-900/30  text-green-600  dark:text-green-400',
  'Text Input':   'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  'Image Upload': 'bg-pink-100   dark:bg-pink-900/30   text-pink-600   dark:text-pink-400',
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 animate-pulse">
      
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
          <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded-lg w-1/2" />
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:block h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
}


function HistoryCard({ item }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 hover:shadow-md hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all cursor-pointer group">
      
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
          <Icon name="file-text" className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-base" />
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
          {item.title}
        </p>
      </div>

      
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg hidden sm:inline-block ${typeColors[item.type]}`}>
          {item.type}
        </span>
        <Icon name="chevron-right" className="text-slate-400 dark:text-slate-500 text-base" />
      </div>
    </div>
  );
}

// Empty State
function EmptyState({ activeTab }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Icon name="clock" className="text-3xl text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
        No history yet
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
        {activeTab === 'created'
          ? 'Questions you create will appear here.'
          : 'Questions you answer will appear here.'}
      </p>
    </div>
  );
}

export default function HistoryList({ list, activeTab, loading }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (list.length === 0) return <EmptyState activeTab={activeTab} />;

  return (
    <div className="space-y-3">
      {list.map(item => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}