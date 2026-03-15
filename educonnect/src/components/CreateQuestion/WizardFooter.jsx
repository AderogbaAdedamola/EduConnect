import Icon from '../common/Icon';

export default function WizardFooter({ currentStep, onBack, onNext, onCancel, formData }) {
  const totalSteps = 4;

  const canProceed = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) return formData.questionType !== '';
    if (currentStep === 3) return formData.questions.length > 0;
    if (currentStep === 4) {
      if (!formData.askUserData) return true;
      return formData.userDataFields &&
             formData.userDataFields.length > 0 &&
             formData.userDataFields.every(field => field.placeholder.trim());
    }
    return true;
  };

  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 md:px-6 py-3 shrink-0">
      <div className="flex items-center justify-between gap-3">

        {/* Left side — Cancel (text link, low prominence) */}
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
        >
          Cancel
        </button>

        {/* Right side — Back (desktop only, mobile uses header arrow) + Next/Finish */}
        <div className="flex items-center gap-2">
          {/* Back button — desktop only, mobile already has back arrow in header */}
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Icon name="arrow-left" aria-hidden="true" />
              Back
            </button>
          )}

          {/* Next / Finish */}
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed()}
            aria-label={isLastStep ? 'Finish and publish' : `Continue to step ${currentStep + 1}`}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
          >
            {isLastStep ? (
              <>
                <Icon name="check" aria-hidden="true" />
                Finish
              </>
            ) : (
              <>
                Next
                <Icon name="arrow-right" aria-hidden="true" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}