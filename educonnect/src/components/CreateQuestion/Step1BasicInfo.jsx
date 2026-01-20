import Icon from '../common/Icon';

export default function Step1BasicInfo({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon name="info" className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Step 1 of 3 - Basic Info</h2>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Sample Question Set"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
        >
          <option value="">Select category</option>
          <option value="mathematics">Mathematics</option>
          <option value="science">Science</option>
          <option value="programming">Programming</option>
          <option value="biology">Biology</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="history">History</option>
          <option value="language">Language</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* AI Feedback Toggle */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="sparkles" className="text-purple-600 dark:text-purple-400 text-xl flex-shrink-0" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">AI Feedback</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enable AI-powered responses</p>
            </div>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={formData.aiEnabled}
              onChange={(e) => handleChange('aiEnabled', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Questions Preview (if any exist) */}
      {formData.questions.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
            <Icon name="list" />
            Questions ({formData.questions.length})
          </h3>
          <div className="space-y-2">
            {formData.questions.map((q, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="font-bold text-slate-600 dark:text-slate-400">{index + 1}.</span>
                <span className="text-slate-700 dark:text-slate-300 truncate flex-1">{q.text || 'Untitled Question'}</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded text-xs font-semibold">
                  {q.type === 'mcq' ? 'MCQ' : q.type === 'text' ? 'Text' : q.type === 'short' ? 'Short' : 'Image'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}