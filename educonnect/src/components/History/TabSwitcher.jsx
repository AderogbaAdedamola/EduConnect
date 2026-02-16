import Icon from '../common/Icon';

export default function TabSwitcher({ tabs, activeTab, onTabChange, counts }) {
  return (
    <>
      {/* Mobile: Dropdown */}
      <div className="block sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value)}
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-semibold"
        >
          {tabs.map(tab => (
            <option key={tab.id} value={tab.id}>
              {tab.label} ({counts[tab.id]})
            </option>
          ))}
        </select>
      </div>

      
      <div className="hidden sm:flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Icon name={tab.icon} className="text-base" />
            {tab.label}
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeTab === tab.id
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            }`}>
              {counts[tab.id]}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}