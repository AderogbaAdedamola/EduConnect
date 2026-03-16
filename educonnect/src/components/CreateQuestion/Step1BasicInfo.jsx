import { useState } from 'react';
import Icon from '../common/Icon';

const TITLE_MAX = 100;

const CATEGORIES = [
  { value: 'mathematics',  label: 'Mathematics',  icon: '📐' },
  { value: 'science',      label: 'Science',       icon: '🔬' },
  { value: 'programming',  label: 'Programming',   icon: '💻' },
  { value: 'biology',      label: 'Biology',       icon: '🧬' },
  { value: 'physics',      label: 'Physics',       icon: '⚛️' },
  { value: 'chemistry',    label: 'Chemistry',     icon: '🧪' },
  { value: 'history',      label: 'History',       icon: '📜' },
  { value: 'language',     label: 'Language',      icon: '🗣️' },
  { value: 'other',        label: 'Other',         icon: '✏️' },
];

export default function Step1BasicInfo({ formData, setFormData, showValidation }) {
  const [otherCategory, setOtherCategory] = useState(formData.otherCategory ?? '');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length <= TITLE_MAX) handleChange('title', val);
  };

  const handleCategorySelect = (value) => {
    handleChange('category', value);
    if (value !== 'other') {
      // Clear other category text when switching away
      setOtherCategory('');
      handleChange('otherCategory', '');
    }
  };

  const handleOtherCategory = (e) => {
    setOtherCategory(e.target.value);
    handleChange('otherCategory', e.target.value);
  };

  const titleEmpty = showValidation && !formData.title.trim();
  const remaining = TITLE_MAX - formData.title.length;
  const nearLimit = remaining <= 20;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
          <Icon name="info" aria-hidden="true" className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Basic Info</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Give your question set a name and category</p>
        </div>
      </div>

      {/* Title */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="qs-title"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Title <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <span
            aria-live="polite"
            className={`text-xs font-medium tabular-nums transition-colors ${
              nearLimit
                ? remaining <= 0
                  ? 'text-red-500'
                  : 'text-amber-500'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {remaining} / {TITLE_MAX}
          </span>
        </div>

        <input
          id="qs-title"
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="e.g. Chapter 5 Review Quiz"
          maxLength={TITLE_MAX}
          aria-required="true"
          aria-describedby={titleEmpty ? 'title-error' : undefined}
          className={`
            w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all
            text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500
            bg-slate-50 dark:bg-slate-900
            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500
            ${titleEmpty
              ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
              : 'border-slate-200 dark:border-slate-700'
            }
          `}
        />

        {titleEmpty && (
          <p id="title-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <Icon name="alert-circle" aria-hidden="true" className="text-xs shrink-0" />
            Title is required before you can continue
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
          Category <span className="font-normal text-slate-400">(optional)</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = formData.category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategorySelect(cat.value)}
                aria-pressed={isSelected}
                className={`
                  flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all text-sm font-medium
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }
                `}
              >
                <span aria-hidden="true" className="text-base leading-none">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
                {isSelected && (
                  <Icon name="check" aria-hidden="true" className="text-blue-500 text-xs ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Other category text input */}
        {formData.category === 'other' && (
          <div className="mt-3">
            <label htmlFor="qs-other-category" className="sr-only">
              Specify your category
            </label>
            <input
              id="qs-other-category"
              type="text"
              value={otherCategory}
              onChange={handleOtherCategory}
              placeholder="Describe your category..."
              maxLength={50}
              autoFocus
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 bg-white dark:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* AI Feedback Toggle */}
      <div
        className={`rounded-2xl border-2 p-4 transition-colors ${
          formData.aiEnabled
            ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              formData.aiEnabled ? 'bg-purple-100 dark:bg-purple-900/40' : 'bg-slate-100 dark:bg-slate-700'
            }`}>
              <Icon
                name="sparkles"
                aria-hidden="true"
                className={`text-base ${formData.aiEnabled ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`}
              />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">AI Feedback</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Respondents get instant AI-powered insights on their answers
              </p>
            </div>
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={formData.aiEnabled}
              onChange={(e) => handleChange('aiEnabled', e.target.checked)}
              aria-label="Enable AI feedback"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-purple-500 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-1" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </label>
        </div>

        {/* Enabled state detail */}
        {formData.aiEnabled && (
          <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800 flex items-center gap-2">
            <Icon name="check-circle" aria-hidden="true" className="text-purple-500 text-sm shrink-0" />
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              AI feedback is on — respondents will receive personalised analysis
            </p>
          </div>
        )}
      </div>

      {/* Questions preview (if any exist) */}
      {formData.questions.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Icon name="list" aria-hidden="true" />
            Questions ({formData.questions.length})
          </h3>
          <div className="space-y-1.5">
            {formData.questions.map((q, i) => {
              const plain = q.text ? q.text.replace(/<[^>]*>/g, '').trim() : ''
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-400 w-5 shrink-0">{i + 1}.</span>
                  <span className="text-slate-600 dark:text-slate-400 truncate flex-1">{plain || 'Untitled question'}</span>
                  <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded font-medium shrink-0">
                    {q.type?.toUpperCase?.() ?? 'Q'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  );
}