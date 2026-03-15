import Icon from '../common/Icon';

const STEPS = [
  { number: 1, label: 'Basic Info' },
  { number: 2, label: 'Question Type' },
  { number: 3, label: 'Questions' },
  { number: 4, label: 'User Info' },
];

export default function WizardHeader({ currentStep, onBack, onCancel }) {
  const currentLabel = STEPS.find(s => s.number === currentStep)?.label ?? '';
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shrink-0">

      {/* Mobile header (hidden on md+) ─*/}
      <div className="flex md:hidden items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={currentStep > 1 ? onBack : onCancel}
          aria-label={currentStep > 1 ? 'Go back' : 'Cancel'}
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Icon name="arrow-left" aria-hidden="true" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">
            {currentLabel} · step {currentStep} of {STEPS.length}
          </p>
          {/* Progress bar */}
          <div
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-label={`Step ${currentStep} of ${STEPS.length}`}
            className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Desktop header (hidden on mobile) ─────────────── */}
      <div className="hidden md:flex items-center gap-4 px-6 py-3">
        {/* Back / Cancel icon */}
        <button
          type="button"
          onClick={currentStep > 1 ? onBack : onCancel}
          aria-label={currentStep > 1 ? 'Go back' : 'Cancel'}
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Icon name="arrow-left" aria-hidden="true" />
        </button>

        {/* Step indicator */}
        <div
          role="list"
          aria-label="Progress steps"
          className="flex items-center flex-1"
        >
          {STEPS.map((step, i) => {
            const isDone   = step.number < currentStep;
            const isActive = step.number === currentStep;

            return (
              <div key={step.number} role="listitem" className="flex items-center" style={{ flex: i < STEPS.length - 1 ? '1' : 'none' }}>
                <div className="flex items-center gap-2 shrink-0">
                  {/* Step circle */}
                  <div
                    aria-hidden="true"
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors
                      ${isDone   ? 'bg-green-500 text-white'
                      : isActive ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-600'}`}
                  >
                    {isDone
                      ? <Icon name="check" className="text-xs" aria-hidden="true" />
                      : step.number
                    }
                  </div>

                  {/* Step label */}
                  <span
                    className={`text-xs font-medium whitespace-nowrap
                      ${isDone   ? 'text-green-600 dark:text-green-400'
                      : isActive ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500'}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={`flex-1 h-px mx-3 transition-colors ${isDone ? 'bg-green-400' : 'bg-slate-200 dark:bg-slate-700'}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}